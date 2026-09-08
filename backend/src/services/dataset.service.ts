import { execFileSync } from 'child_process';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { config } from '../config/index.js';
import { logger } from '../config/logger.js';
import { prisma } from '../config/prisma.js';
import { AppError } from '../middlewares/errorHandler.js';
import { DatasetFormat } from '../types/index.js';

export class DatasetService {
  private getUploadRoot(): string {
    return path.resolve(config.upload.uploadPath);
  }

  private toRelativeUploadPath(targetPath: string): string {
    return path.relative(this.getUploadRoot(), targetPath).split(path.sep).join('/');
  }

  private parseStructuredFile(filePath: string, format: DatasetFormat): Array<Record<string, unknown>> {
    if (format === DatasetFormat.CSV) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return parse(fileContent, { columns: true, skip_empty_lines: true }) as Array<Record<string, unknown>>;
    }

    if (format === DatasetFormat.JSON) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileContent) as unknown;
      if (!Array.isArray(parsed)) {
        throw new AppError('JSON dataset must be an array of records', 400);
      }
      return parsed as Array<Record<string, unknown>>;
    }

    return [{ filePath }];
  }

  private isImageFile(filePath: string): boolean {
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'].includes(path.extname(filePath).toLowerCase());
  }

  private findFilesRecursively(directory: string): string[] {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    return entries.flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return this.findFilesRecursively(entryPath);
      }

      return [entryPath];
    });
  }

  private findManifestFile(directory: string): string | null {
    const preferredNames = ['manifest.csv', 'manifest.json', 'dataset.csv', 'dataset.json', 'records.csv', 'records.json'];
    const files = this.findFilesRecursively(directory);
    const preferred = files.find((file) => preferredNames.includes(path.basename(file).toLowerCase()));
    if (preferred) {
      return preferred;
    }

    return files.find((file) => ['.csv', '.json'].includes(path.extname(file).toLowerCase())) ?? null;
  }

  private parseImageRecord(record: Record<string, unknown>, baseDirectory: string): Record<string, unknown> {
    const normalizedRecord = { ...record };
    const candidateKeys = ['imagePath', 'image_path', 'filePath', 'file_path', 'image', 'path', 'filename', 'fileName'];

    for (const key of candidateKeys) {
      const value = normalizedRecord[key];
      if (typeof value === 'string' && value.trim()) {
        const resolvedPath = path.isAbsolute(value) ? value : path.resolve(baseDirectory, value);
        const relativePath = this.toRelativeUploadPath(resolvedPath);
        normalizedRecord.imagePath = relativePath;
        normalizedRecord.filePath = relativePath;
        normalizedRecord.fileName = path.basename(resolvedPath);
        break;
      }
    }

    return normalizedRecord;
  }

  private parseImageDataset(filePath: string, originalName: string): { records: Array<Record<string, unknown>>; storagePath: string } {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.zip') {
      const bundleName = `${path.basename(originalName, ext)}-${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const extractDir = fs.mkdtempSync(path.join(this.getUploadRoot(), `${bundleName}-`));

      execFileSync('unzip', ['-oq', filePath, '-d', extractDir], { stdio: 'ignore' });

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      const manifestFile = this.findManifestFile(extractDir);
      if (manifestFile) {
        const manifestFormat = path.extname(manifestFile).toLowerCase() === '.json' ? DatasetFormat.JSON : DatasetFormat.CSV;
        const manifestRecords = this.parseStructuredFile(manifestFile, manifestFormat);

        return {
          storagePath: extractDir,
          records: manifestRecords.map((record) => this.parseImageRecord(record, path.dirname(manifestFile))),
        };
      }

      const imageFiles = this.findFilesRecursively(extractDir).filter((entry) => this.isImageFile(entry));
      if (imageFiles.length === 0) {
        throw new AppError('Image archive does not contain any supported image files', 400);
      }

      return {
        storagePath: extractDir,
        records: imageFiles.map((imagePath, index) => ({
          record_id: index + 1,
          imagePath: this.toRelativeUploadPath(imagePath),
          fileName: path.basename(imagePath),
        })),
      };
    }

    if (!this.isImageFile(filePath)) {
      throw new AppError('Unsupported image file format', 400);
    }

    return {
      storagePath: filePath,
      records: [{
        record_id: 1,
        imagePath: this.toRelativeUploadPath(filePath),
        fileName: path.basename(filePath),
      }],
    };
  }

  /**
   * Get all datasets with pagination
   */
  async getAllDatasets(page: number = 1, limit: number = 10, user?: { id: string; role: string }) {
    const skip = (page - 1) * limit;
    const where = user && user.role !== 'admin' ? { createdById: user.id } : undefined;

    const [datasets, total] = await Promise.all([
      prisma.dataset.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          createdBy: true,
        },
      }),
      prisma.dataset.count({ where }),
    ]);

    return {
      datasets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Upload a new dataset
   */
  async uploadDataset(
    name: string,
    description: string,
    file: Express.Multer.File,
    createdById: string,
    options?: {
      labelType?: string;
      labelOptions?: unknown;
      labelSchema?: unknown;
      totalRewardSOL?: number;
      maxLabelsPerRecord?: number;
      consensusThreshold?: number;
    }
  ) {
    // Determine format from file extension
    const ext = path.extname(file.originalname).toLowerCase();
    let format: DatasetFormat;

    if (ext === '.csv') {
      format = DatasetFormat.CSV;
    } else if (ext === '.json') {
      format = DatasetFormat.JSON;
    } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.zip'].includes(ext)) {
      format = DatasetFormat.IMAGE;
    } else {
      throw new AppError('Unsupported file format', 400);
    }

    // Parse file to get records and schema.
    let records: Array<Record<string, unknown>> = [];
    let schema = null;
    let storagePath = file.path;

    try {
      if (format === DatasetFormat.IMAGE) {
        const imageDataset = this.parseImageDataset(file.path, file.originalname);
        records = imageDataset.records;
        storagePath = imageDataset.storagePath;
      } else {
        records = this.parseStructuredFile(file.path, format);
      }

      if (records.length > 0) {
        schema = Object.keys(records[0]);
      }
    } catch (error) {
      logger.error('Error parsing dataset file:', error);
      throw new AppError('Invalid file format or corrupted file', 400);
    }

    const totalRecords = records.length;
    if (totalRecords === 0) {
      throw new AppError('Dataset is empty', 400);
    }

    const totalRewardSOL = options?.totalRewardSOL ?? 0;
    const rewardPerRecord = totalRecords > 0 ? totalRewardSOL / totalRecords : 0;

    const dataset = await prisma.$transaction(async (tx) => {
      const createdDataset = await tx.dataset.create({
        data: {
          name,
          description,
          format,
          filePath: storagePath,
          totalRecords,
          schema: schema ?? undefined,
          labelType: options?.labelType ?? 'text',
          labelOptions: options?.labelOptions as any,
          labelSchema: options?.labelSchema as any,
          totalRewardSOL,
          rewardPerRecord,
          maxLabelsPerRecord: options?.maxLabelsPerRecord ?? 3,
          consensusThreshold: options?.consensusThreshold ?? 0.67,
          createdById,
        },
      });

      await tx.dataRecord.createMany({
        data: records.map((record, index) => ({
          datasetId: createdDataset.id,
          recordNumber: index + 1,
          rawData: record as any,
        })),
      });

      return tx.dataset.findUniqueOrThrow({
        where: { id: createdDataset.id },
        include: {
          createdBy: true,
          records: {
            select: { id: true, recordNumber: true },
            orderBy: { recordNumber: 'asc' },
            take: 5,
          },
        },
      });
    });

    logger.info(`Dataset uploaded: ${dataset.id} by user ${createdById}`);

    return dataset;
  }

  /**
   * Get dataset by ID
   */
  async getDatasetById(datasetId: string) {
    const dataset = await prisma.dataset.findUnique({
      where: { id: datasetId },
      include: {
        createdBy: true,
        tasks: true,
        records: {
          orderBy: { recordNumber: 'asc' },
          take: 20,
        },
      },
    });

    if (!dataset) {
      throw new AppError('Dataset not found', 404);
    }

    return dataset;
  }

  /**
   * Delete dataset
   */
  async deleteDataset(datasetId: string) {
    const dataset = await prisma.dataset.findUnique({
      where: { id: datasetId },
    });

    if (!dataset) {
      throw new AppError('Dataset not found', 404);
    }

    // Delete physical file
    try {
      if (fs.existsSync(dataset.filePath)) {
        const fileStats = fs.statSync(dataset.filePath);
        if (fileStats.isDirectory()) {
          fs.rmSync(dataset.filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(dataset.filePath);
        }
      }
    } catch (error) {
      logger.error('Error deleting dataset file:', error);
    }

    // Delete database record
    await prisma.dataset.delete({
      where: { id: datasetId },
    });

    logger.info(`Dataset deleted: ${datasetId}`);
  }

  /**
   * Publish dataset and create tasks from records.
   * Uses createMany for performance — avoids per-row transaction timeouts on large datasets.
   */
  async publishDataset(datasetId: string, actorId: string) {
    const dataset = await prisma.dataset.findUnique({
      where: { id: datasetId },
      include: {
        records: { orderBy: { recordNumber: 'asc' } },
      },
    });

    if (!dataset) {
      throw new AppError('Dataset not found', 404);
    }

    if (dataset.records.length === 0) {
      throw new AppError('Dataset has no records to publish', 400);
    }

    const existingTasks = await prisma.task.count({ where: { datasetId } });
    if (existingTasks > 0) {
      throw new AppError('Dataset is already published', 400);
    }

    await prisma.task.createMany({
      data: dataset.records.map((record) => ({
        title: `${dataset.name} - Record ${record.recordNumber}`,
        description: `Label record ${record.recordNumber} from dataset ${dataset.name}`,
        reward: dataset.rewardPerRecord,
        requiredLabels: dataset.maxLabelsPerRecord,
        consensusThreshold: dataset.consensusThreshold,
        status: 'pending',
        datasetId: dataset.id,
        recordId: record.id,
      })),
    });

    const tasksCreated = dataset.records.length;
    logger.info(`Dataset published: ${dataset.id} by user ${actorId}; tasks created=${tasksCreated}`);

    return {
      datasetId: dataset.id,
      tasksCreated,
      rewardPerRecord: dataset.rewardPerRecord,
      totalRewardSOL: dataset.totalRewardSOL,
    };
  }
}

import { Request, Response } from 'express';
import { AppError, asyncHandler } from '../middlewares/errorHandler.js';
import { DatasetService } from '../services/dataset.service.js';
import { ApiResponse } from '../types/index.js';

function parseMaybeJson(input: unknown, fieldName: string): unknown {
  if (input === undefined || input === null || input === '') {
    return undefined;
  }

  if (typeof input !== 'string') {
    return input;
  }

  try {
    return JSON.parse(input);
  } catch {
    throw new AppError(`Invalid JSON for ${fieldName}`, 400);
  }
}

export class DatasetController {
  private datasetService: DatasetService;

  constructor() {
    this.datasetService = new DatasetService();
  }

  /**
   * Get all datasets
   */
  getAllDatasets = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await this.datasetService.getAllDatasets(page, limit, {
      id: req.userId!,
      role: req.user?.role ?? 'contributor',
    });

    const response: ApiResponse = {
      success: true,
      message: 'Datasets retrieved successfully',
      data: result,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Upload a new dataset
   */
  uploadDataset = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
      throw new AppError('No file uploaded', 400);
    }

    const {
      name,
      description,
      labelType,
      labelOptions,
      labelSchema,
      totalRewardSOL,
      maxLabelsPerRecord,
      consensusThreshold,
    } = req.body;
    const dataset = await this.datasetService.uploadDataset(
      name,
      description,
      req.file,
      req.userId!,
      {
        labelType,
        labelOptions: parseMaybeJson(labelOptions, 'labelOptions'),
        labelSchema: parseMaybeJson(labelSchema, 'labelSchema'),
        totalRewardSOL: totalRewardSOL !== undefined ? Number(totalRewardSOL) : undefined,
        maxLabelsPerRecord: maxLabelsPerRecord !== undefined ? Number(maxLabelsPerRecord) : undefined,
        consensusThreshold: consensusThreshold !== undefined ? Number(consensusThreshold) : undefined,
      }
    );

    const response: ApiResponse = {
      success: true,
      message: 'Dataset uploaded successfully',
      data: dataset,
      timestamp: new Date().toISOString(),
    };

    res.status(201).json(response);
  });

  /**
   * Publish dataset into tasks
   */
  publishDataset = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.datasetService.publishDataset(id, req.userId!);

    const response: ApiResponse = {
      success: true,
      message: 'Dataset published successfully',
      data: result,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Get dataset by ID
   */
  getDatasetById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const dataset = await this.datasetService.getDatasetById(id);

    const response: ApiResponse = {
      success: true,
      message: 'Dataset retrieved successfully',
      data: dataset,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Delete dataset
   */
  deleteDataset = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.datasetService.deleteDataset(id);

    const response: ApiResponse = {
      success: true,
      message: 'Dataset deleted successfully',
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });
}

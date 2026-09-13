import { Request, Response } from 'express';
import { AppError, asyncHandler } from '../middlewares/errorHandler.js';
import { DatasetService } from '../services/dataset.service.js';
import { ApiResponse } from '../types/index.js';
import { sendZodValidationError } from '../middlewares/validation.js';
import {
  DatasetPublishSchema,
  DatasetUploadSchema,
} from '../lib/validations/schemas.js';

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
    const parsed = DatasetUploadSchema.safeParse(req.body);
    if (!parsed.success) {
      sendZodValidationError(res, parsed.error);
      return;
    }

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
    } = parsed.data;
    const dataset = await this.datasetService.uploadDataset(
      name,
      description ?? '',
      req.file,
      req.userId!,
      {
        labelType,
        labelOptions,
        labelSchema,
        totalRewardSOL,
        maxLabelsPerRecord,
        consensusThreshold,
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
    const parsed = DatasetPublishSchema.safeParse(req.body);
    if (!parsed.success) {
      sendZodValidationError(res, parsed.error);
      return;
    }

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

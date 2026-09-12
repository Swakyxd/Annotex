import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler.js';
import { LabelService } from '../services/label.service.js';
import { ApiResponse } from '../types/index.js';

export class LabelController {
  private labelService: LabelService;

  constructor() {
    this.labelService = new LabelService();
  }

  /**
   * Submit a label for a task
   */
  submitLabel = asyncHandler(async (req: Request, res: Response) => {
    const labelData = {
      ...req.body,
      contributorId: req.userId!,
    };

    const result = await this.labelService.submitLabel(labelData);

    const response: ApiResponse = {
      success: true,
      message: 'Label submitted successfully',
      data: result,
      timestamp: new Date().toISOString(),
    };

    res.status(201).json(response);
  });

  /**
   * Get label by ID
   */
  getLabelById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const label = await this.labelService.getLabelById(id);

    const response: ApiResponse = {
      success: true,
      message: 'Label retrieved successfully',
      data: label,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Get all labels for a specific task
   */
  getTaskLabels = asyncHandler(async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const labels = await this.labelService.getTaskLabels(taskId);

    const response: ApiResponse = {
      success: true,
      message: 'Task labels retrieved successfully',
      data: labels,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Get current contributor label history
   */
  getLabelHistory = asyncHandler(async (req: Request, res: Response) => {
    const labels = await this.labelService.getContributorLabels(req.userId!);

    const response: ApiResponse = {
      success: true,
      message: 'Label history retrieved successfully',
      data: labels,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Manually approve label
   */
  approveLabel = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const label = await this.labelService.approveLabel(id);

    const response: ApiResponse = {
      success: true,
      message: 'Label approved successfully',
      data: label,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Manually reject label
   */
  rejectLabel = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const reason = req.body.reason as string | undefined;
    const label = await this.labelService.rejectLabel(id, reason);

    const response: ApiResponse = {
      success: true,
      message: 'Label rejected successfully',
      data: label,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Validate label (approve or reject via single endpoint)
   */
  validateLabel = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { isAccepted, action, reason } = req.body;
    const accepted = typeof isAccepted === 'boolean' ? isAccepted : action === 'approve';
    const label = await this.labelService.updateLabelStatus(id, accepted, reason);

    const response: ApiResponse = {
      success: true,
      message: `Label ${accepted ? 'approved' : 'rejected'} successfully`,
      data: label,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });
}

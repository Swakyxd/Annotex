import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler.js';
import { BlockchainService } from '../services/blockchain.service.js';
import { PayoutService } from '../services/payout.service.js';
import { ApiResponse } from '../types/index.js';
import { sendZodValidationError } from '../middlewares/validation.js';
import {
  CalculatePayoutsSchema,
  TriggerPayoutSchema,
} from '../lib/validations/schemas.js';

export class PayoutController {
  private payoutService: PayoutService;
  private blockchainService: BlockchainService;

  constructor() {
    this.payoutService = new PayoutService();
    this.blockchainService = new BlockchainService();
  }

  calculatePayouts = asyncHandler(async (req: Request, res: Response) => {
    const parsed = CalculatePayoutsSchema.safeParse(req.body);
    if (!parsed.success) {
      sendZodValidationError(res, parsed.error);
      return;
    }

    const result = await this.payoutService.calculatePayouts(parsed.data.datasetId);

    const response: ApiResponse = {
      success: true,
      message: 'Payouts calculated successfully',
      data: result,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  getPendingPayouts = asyncHandler(async (req: Request, res: Response) => {
    const contributorId = req.userId!;
    const result = await this.payoutService.getContributorPendingPayouts(contributorId);

    const response: ApiResponse = {
      success: true,
      message: 'Pending payouts retrieved successfully',
      data: result,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  triggerPayout = asyncHandler(async (req: Request, res: Response) => {
    const parsed = TriggerPayoutSchema.safeParse(req.body);
    if (!parsed.success) {
      sendZodValidationError(res, parsed.error);
      return;
    }

    const { userId, datasetId } = parsed.data;

    const payoutRequest = await this.blockchainService.createContributorPayoutRequest({
      adminUserId: req.userId!,
      contributorId: userId,
      datasetId,
    });

    const response: ApiResponse = {
      success: true,
      message: 'Contributor payout request created successfully',
      data: payoutRequest,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });
}

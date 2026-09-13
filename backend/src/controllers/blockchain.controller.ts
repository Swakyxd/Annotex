import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler.js';
import { BlockchainService } from '../services/blockchain.service.js';
import { ApiResponse } from '../types/index.js';
import { sendZodValidationError } from '../middlewares/validation.js';
import {
  ConfirmTransferSchema,
  ConnectWalletSchema,
  ProcessPayoutSchema,
  ProjectFundingSchema,
} from '../lib/validations/schemas.js';

export class BlockchainController {
  private blockchainService: BlockchainService;

  constructor() {
    this.blockchainService = new BlockchainService();
  }

  /**
   * Connect wallet address to user account
   */
  connectWallet = asyncHandler(async (req: Request, res: Response) => {
    const parsed = ConnectWalletSchema.safeParse(req.body);
    if (!parsed.success) {
      sendZodValidationError(res, parsed.error);
      return;
    }

    const userId = req.userId!;

    const result = await this.blockchainService.connectWallet(userId, parsed.data.walletAddress);

    const response: ApiResponse = {
      success: true,
      message: 'Wallet connected successfully',
      data: result,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Process payout to user
   */
  processPayout = asyncHandler(async (req: Request, res: Response) => {
    const parsed = ProcessPayoutSchema.safeParse(req.body);
    if (!parsed.success) {
      sendZodValidationError(res, parsed.error);
      return;
    }

    const transaction = await this.blockchainService.processPayout(
      parsed.data.userId,
      parsed.data.amount
    );

    const response: ApiResponse = {
      success: true,
      message: 'Payout processed successfully',
      data: transaction,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  createProjectFundingRequest = asyncHandler(async (req: Request, res: Response) => {
    const parsed = ProjectFundingSchema.safeParse(req.body);
    if (!parsed.success) {
      sendZodValidationError(res, parsed.error);
      return;
    }

    const { datasetId, amountSOL, label, message, memo } = parsed.data;

    const result = await this.blockchainService.createProjectFundingRequest({
      adminUserId: req.userId!,
      datasetId,
      amountSOL,
      label,
      message,
      memo,
    });

    const response: ApiResponse = {
      success: true,
      message: 'Project funding request created successfully',
      data: result,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  confirmTransferRequest = asyncHandler(async (req: Request, res: Response) => {
    const parsed = ConfirmTransferSchema.safeParse(req.body);
    if (!parsed.success) {
      sendZodValidationError(res, parsed.error);
      return;
    }

    const result = await this.blockchainService.confirmTransferRequest(parsed.data.transactionId);

    const response: ApiResponse = {
      success: true,
      message: result.status === 'confirmed' ? 'Payment confirmed' : 'Payment not confirmed yet',
      data: result,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Get transaction history
   */
  getTransactions = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId!;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const includeAll =
      req.user?.role === 'admin' &&
      (req.query.all === 'true' || req.query.all === '1');

    const result = await this.blockchainService.getTransactions(userId, page, limit, includeAll);

    const response: ApiResponse = {
      success: true,
      message: 'Transactions retrieved successfully',
      data: result,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Get transaction by ID
   */
  getTransactionById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const transaction = await this.blockchainService.getTransactionById(id);

    const response: ApiResponse = {
      success: true,
      message: 'Transaction retrieved successfully',
      data: transaction,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });
}

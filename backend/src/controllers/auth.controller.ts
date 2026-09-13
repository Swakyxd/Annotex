import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler.js';
import { AuthService } from '../services/auth.service.js';
import { ApiResponse } from '../types/index.js';
import {
  LoginSchema,
  RefreshTokenSchema,
  RegisterSchema,
} from '../lib/validations/schemas.js';
import { sendZodValidationError } from '../middlewares/validation.js';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Register a new user
   */
  register = asyncHandler(async (req: Request, res: Response) => {
    const parsed = RegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      sendZodValidationError(res, parsed.error);
      return;
    }

    const result = await this.authService.register(parsed.data);

    const response: ApiResponse = {
      success: true,
      message: 'User registered successfully',
      data: result,
      timestamp: new Date().toISOString(),
    };

    res.status(201).json(response);
  });

  /**
   * Login user
   */
  login = asyncHandler(async (req: Request, res: Response) => {
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) {
      sendZodValidationError(res, parsed.error);
      return;
    }

    const result = await this.authService.login(parsed.data.email, parsed.data.password);

    const response: ApiResponse = {
      success: true,
      message: 'Login successful',
      data: result,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Refresh access token
   */
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const parsed = RefreshTokenSchema.safeParse(req.body);
    if (!parsed.success) {
      sendZodValidationError(res, parsed.error);
      return;
    }

    const result = await this.authService.refreshToken(parsed.data.refreshToken);

    const response: ApiResponse = {
      success: true,
      message: 'Token refreshed successfully',
      data: result,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Get current user profile
   */
  getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId!;
    const user = await this.authService.getUserProfile(userId);

    const response: ApiResponse = {
      success: true,
      message: 'User profile retrieved successfully',
      data: user,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });
}

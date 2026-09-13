import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler.js';
import { UserService } from '../services/user.service.js';
import { ApiResponse } from '../types/index.js';
import { sendZodValidationError } from '../middlewares/validation.js';
import { UserUpdateSchema } from '../lib/validations/schemas.js';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Get all users with pagination
   */
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await this.userService.getAllUsers(page, limit);

    const response: ApiResponse = {
      success: true,
      message: 'Users retrieved successfully',
      data: result,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Get user by ID
   */
  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);

    const response: ApiResponse = {
      success: true,
      message: 'User retrieved successfully',
      data: user,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Update user profile
   */
  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsed = UserUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      sendZodValidationError(res, parsed.error);
      return;
    }

    const user = await this.userService.updateUser(id, parsed.data, req.userId!);

    const response: ApiResponse = {
      success: true,
      message: 'User updated successfully',
      data: user,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Get user statistics
   */
  getUserStats = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const stats = await this.userService.getUserStats(id);

    const response: ApiResponse = {
      success: true,
      message: 'User statistics retrieved successfully',
      data: stats,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });
}

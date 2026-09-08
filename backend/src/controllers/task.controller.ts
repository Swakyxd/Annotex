import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler.js';
import { TaskService } from '../services/task.service.js';
import { ApiResponse, TaskStatus } from '../types/index.js';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  /**
   * Get all tasks with filters and pagination
   */
  getAllTasks = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as TaskStatus | undefined;

    const result = await this.taskService.getAllTasks(page, limit, status);

    const response: ApiResponse = {
      success: true,
      message: 'Tasks retrieved successfully',
      data: result,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Create a new task
   */
  createTask = asyncHandler(async (req: Request, res: Response) => {
    const taskData = req.body;
    const task = await this.taskService.createTask(taskData, req.userId!);

    const response: ApiResponse = {
      success: true,
      message: 'Task created successfully',
      data: task,
      timestamp: new Date().toISOString(),
    };

    res.status(201).json(response);
  });

  /**
   * Get task by ID
   */
  getTaskById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await this.taskService.getTaskById(id);

    const response: ApiResponse = {
      success: true,
      message: 'Task retrieved successfully',
      data: task,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Get records available for a task
   */
  getTaskRecords = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const records = await this.taskService.getTaskRecords(id);

    const response: ApiResponse = {
      success: true,
      message: 'Task records retrieved successfully',
      data: records,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Assign task to current user
   */
  assignTask = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await this.taskService.assignTask(id, req.userId!);

    const response: ApiResponse = {
      success: true,
      message: 'Task assigned successfully',
      data: task,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });

  /**
   * Return the current user's task to the available queue
   */
  unassignTask = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await this.taskService.unassignTask(id, req.userId!);

    const response: ApiResponse = {
      success: true,
      message: 'Task returned to the queue',
      data: task,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  });
}

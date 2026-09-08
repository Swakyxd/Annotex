import { logger } from '../config/logger.js';
import { prisma } from '../config/prisma.js';
import { AppError } from '../middlewares/errorHandler.js';
import { TaskStatus } from '../types/index.js';

export class TaskService {
  /**
   * Get all tasks with filters and pagination
   */
  async getAllTasks(page: number = 1, limit: number = 10, status?: TaskStatus) {
    const skip = (page - 1) * limit;

    const where = status ? { status } : undefined;
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          dataset: true,
          assignedTo: true,
        },
      }),
      prisma.task.count({ where }),
    ]);

    return {
      tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Create a new task
   */
  async createTask(taskData: {
    title: string;
    description: string;
    reward: number;
    datasetId: string;
    requiredLabels?: number;
    consensusThreshold?: number;
    metadata?: Record<string, any>;
  }, createdById: string) {
    // Verify dataset exists
    const dataset = await prisma.dataset.findUnique({
      where: { id: taskData.datasetId },
    });

    if (!dataset) {
      throw new AppError('Dataset not found', 404);
    }

    const task = await prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        reward: taskData.reward,
        datasetId: taskData.datasetId,
        requiredLabels: taskData.requiredLabels,
        consensusThreshold: taskData.consensusThreshold,
        metadata: taskData.metadata,
        status: TaskStatus.PENDING,
      },
      include: {
        dataset: true,
        assignedTo: true,
      },
    });

    logger.info(`Task created: ${task.id} by user ${createdById}`);

    return task;
  }

  /**
   * Get task by ID
   */
  async getTaskById(taskId: string) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        dataset: true,
        record: true,
        assignedTo: true,
        labels: true,
      },
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    return task;
  }

  /**
   * Fetch records for a task.
   */
  async getTaskRecords(taskId: string) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        dataset: true,
        record: true,
      },
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    if (task.record) {
      return {
        taskId: task.id,
        datasetId: task.datasetId,
        records: [task.record],
      };
    }

    const records = await prisma.dataRecord.findMany({
      where: { datasetId: task.datasetId },
      orderBy: { recordNumber: 'asc' },
      take: 100,
    });

    return {
      taskId: task.id,
      datasetId: task.datasetId,
      records,
    };
  }

  /**
   * Assign task to user
   */
  async assignTask(taskId: string, userId: string) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    if (task.status !== TaskStatus.PENDING) {
      throw new AppError('Task is not available for assignment', 400);
    }

    if (task.assignedToId && task.assignedToId !== userId) {
      throw new AppError('Task is already assigned to another user', 400);
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        assignedToId: userId,
        status: TaskStatus.IN_PROGRESS,
      },
      include: {
        dataset: true,
        assignedTo: true,
      },
    });

    logger.info(`Task ${taskId} assigned to user ${userId}`);

    return updatedTask;
  }

  /**
   * Return an in-progress task to the available queue.
   */
  async unassignTask(taskId: string, userId: string) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    if (task.status !== TaskStatus.IN_PROGRESS || task.assignedToId !== userId) {
      throw new AppError('Only the assigned contributor can leave this task', 403);
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        assignedToId: null,
        status: TaskStatus.PENDING,
      },
      include: {
        dataset: true,
        assignedTo: true,
      },
    });

    logger.info(`Task ${taskId} returned to the queue by user ${userId}`);

    return updatedTask;
  }

  /**
   * Update task status
   */
  async updateTaskStatus(taskId: string, status: TaskStatus) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        status,
        completedAt:
          status === TaskStatus.COMPLETED || status === TaskStatus.VALIDATED
            ? new Date()
            : null,
      },
      include: {
        dataset: true,
        assignedTo: true,
      },
    });

    logger.info(`Task ${taskId} status updated to ${status}`);

    return updatedTask;
  }
}

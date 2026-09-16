import { logger } from '../config/logger.js';
import { prisma } from '../config/prisma.js';
import { AppError } from '../middlewares/errorHandler.js';
import { TaskStatus } from '../types/index.js';

export class LabelService {
  /**
   * Submit a label for a task
   */
  async submitLabel(labelData: {
    taskId: string;
    contributorId: string;
    recordId?: string;
    value: string;
    confidence?: number;
    timeSpentSeconds?: number;
    metadata?: Record<string, any>;
  }) {
    // Verify task exists
    const task = await prisma.task.findUnique({
      where: { id: labelData.taskId },
      include: {
        labels: true,
        dataset: true,
      },
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    const isTaskAvailable =
      task.status === TaskStatus.PENDING ||
      task.status === TaskStatus.IN_PROGRESS ||
      (task.status === TaskStatus.LABELED && task.submittedLabels < task.requiredLabels);

    if (!isTaskAvailable) {
      throw new AppError('Task is not available for labeling', 400);
    }

    // Check task assignment: if task is assigned to another user, throw 403
    if (task.assignedToId && task.assignedToId.toLowerCase() !== labelData.contributorId.toLowerCase()) {
      throw new AppError('This task is not assigned to you', 403);
    }

    if (task.recordId && labelData.recordId && task.recordId !== labelData.recordId) {
      throw new AppError('Label record does not match task record', 400);
    }

    const effectiveRecordId = labelData.recordId ?? task.recordId ?? undefined;

    if (effectiveRecordId) {
      const record = await prisma.dataRecord.findUnique({ where: { id: effectiveRecordId } });
      if (!record || record.datasetId !== task.datasetId) {
        throw new AppError('Record not found for task dataset', 400);
      }
    }

    if (task.dataset.labelType === 'category' || task.dataset.labelType === 'multi-select') {
      const allowedOptions = Array.isArray(task.dataset.labelOptions)
        ? (task.dataset.labelOptions as string[])
        : [];

      if (allowedOptions.length > 0 && !allowedOptions.includes(labelData.value)) {
        throw new AppError('Label value is not in allowed options', 400);
      }
    }

    // Check if user already submitted a label for this task
    const existingLabel = await prisma.label.findFirst({
      where: {
        taskId: labelData.taskId,
        contributorId: labelData.contributorId,
        recordId: effectiveRecordId,
      },
    });

    if (existingLabel) {
      throw new AppError('You have already submitted a label for this task', 400);
    }

    // Auto-assign task to contributor submitting the label if currently unassigned
    if (!task.assignedToId) {
      await prisma.task.update({
        where: { id: task.id },
        data: {
          assignedToId: labelData.contributorId,
          status: TaskStatus.IN_PROGRESS,
        },
      });
      task.assignedToId = labelData.contributorId;
      task.status = TaskStatus.IN_PROGRESS;
    }

    // Create label
    const label = await prisma.label.create({
      data: {
        taskId: labelData.taskId,
        contributorId: labelData.contributorId,
        recordId: effectiveRecordId,
        value: labelData.value,
        confidence: labelData.confidence,
        timeSpentSeconds: labelData.timeSpentSeconds,
        metadata: labelData.metadata,
      },
    });

    const nextSubmittedCount = task.submittedLabels + 1;
    const isFullyLabeled = nextSubmittedCount >= task.requiredLabels;

    // Update task submitted labels count & status
    await prisma.task.update({
      where: { id: task.id },
      data: {
        submittedLabels: { increment: 1 },
        status: isFullyLabeled ? TaskStatus.LABELED : TaskStatus.PENDING,
        assignedToId: isFullyLabeled ? task.assignedToId : null,
      },
      select: {
        id: true,
        submittedLabels: true,
        requiredLabels: true,
      },
    });

    logger.info(`Label submitted for task ${labelData.taskId} by user ${labelData.contributorId}`);

    // `labeled` is the review-ready state. Consensus must be decided by a
    // validator, not automatically during the final contributor submission.

    return label;
  }

  /**
   * Get label by ID
   */
  async getLabelById(labelId: string) {
    const label = await prisma.label.findUnique({
      where: { id: labelId },
      include: {
        task: true,
        contributor: true,
      },
    });

    if (!label) {
      throw new AppError('Label not found', 404);
    }

    return label;
  }

  /**
   * Get all labels for a task
   */
  async getTaskLabels(taskId: string) {
    const labels = await prisma.label.findMany({
      where: { taskId },
      include: { contributor: true },
      orderBy: { createdAt: 'desc' },
    });

    return labels;
  }

  /**
   * Get labels submitted by a contributor
   */
  async getContributorLabels(contributorId: string) {
    const labels = await prisma.label.findMany({
      where: { contributorId },
      include: {
        task: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return labels;
  }

  async approveLabel(labelId: string) {
    return this.updateLabelStatus(labelId, true);
  }

  async rejectLabel(labelId: string, reason?: string) {
    return this.updateLabelStatus(labelId, false, reason ?? 'Rejected by reviewer');
  }

  /**
   * Update label acceptance status
   */
  async updateLabelStatus(labelId: string, isAccepted: boolean, rejectionReason?: string) {
    const label = await prisma.label.findUnique({
      where: { id: labelId },
      include: {
        contributor: true,
        task: true,
      },
    });

    if (!label) {
      throw new AppError('Label not found', 404);
    }

    if (label.isAccepted || label.isRejected) {
      throw new AppError('Label has already been reviewed', 400);
    }

    const updatedLabel = await prisma.$transaction(async (tx) => {
      // Always target the individual label. Other labels for the same task
      // must remain untouched until they are explicitly reviewed.
      const reviewedLabel = await tx.label.update({
        where: { id: labelId },
        data: {
          isAccepted,
          isRejected: !isAccepted,
          rejectionReason: isAccepted ? null : rejectionReason ?? 'Rejected by reviewer',
        },
        include: {
          contributor: true,
        },
      });

      const remainingPendingLabels = await tx.label.count({
        where: {
          taskId: label.taskId,
          isAccepted: false,
          isRejected: false,
        },
      });

      if (remainingPendingLabels === 0) {
        const taskLabels = await tx.label.findMany({
          where: { taskId: label.taskId },
          select: { isAccepted: true },
        });
        const allLabelsAccepted = taskLabels.every((taskLabel) => taskLabel.isAccepted);

        await tx.task.update({
          where: { id: label.taskId },
          data: {
            status: allLabelsAccepted ? TaskStatus.VALIDATED : TaskStatus.REJECTED,
            completedAt: new Date(),
          },
        });
      } else {
        await tx.task.update({
          where: { id: label.taskId },
          data: {
            status: TaskStatus.LABELED,
            completedAt: null,
          },
        });
      }

      return reviewedLabel;
    });

    // Update contributor statistics after either decision.
    const contributorId = updatedLabel.contributorId;
    if (isAccepted) {
      await prisma.user.update({
        where: { id: contributorId },
        data: {
          tasksCompleted: { increment: 1 },
        },
      });
    }

    // Recalculate accuracy rate
    const totalLabels = await prisma.label.count({
      where: { contributorId },
    });

    const acceptedLabels = await prisma.label.count({
      where: { contributorId, isAccepted: true },
    });

    await prisma.user.update({
      where: { id: contributorId },
      data: {
        accuracyRate: totalLabels > 0 ? (acceptedLabels / totalLabels) * 100 : 0,
      },
    });

    logger.info(`Label ${labelId} ${isAccepted ? 'accepted' : 'rejected'}`);

    return updatedLabel;
  }
}

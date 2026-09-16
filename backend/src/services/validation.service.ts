import { logger } from '../config/logger.js';
import { prisma } from '../config/prisma.js';
import { AppError } from '../middlewares/errorHandler.js';
import { TaskStatus, ValidationResult } from '../types/index.js';

export class ValidationService {
  /**
   * Validate a task using majority voting
   */
  async validateTask(taskId: string): Promise<ValidationResult> {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { labels: true },
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    const labels = task.labels;

    if (labels.length < task.requiredLabels) {
      return {
        isValid: false,
        score: 0,
        consensusReached: false,
      };
    }

    // Count label values
    const labelCounts = new Map<string, number>();
    labels.forEach((label) => {
      const count = labelCounts.get(label.value) || 0;
      labelCounts.set(label.value, count + 1);
    });

    // Find majority label
    let majorityLabel = '';
    let maxCount = 0;
    labelCounts.forEach((count, value) => {
      if (count > maxCount) {
        maxCount = count;
        majorityLabel = value;
      }
    });

    // Calculate consensus score
    const consensusScore = maxCount / labels.length;
    const consensusReached = consensusScore >= task.consensusThreshold;

    // Update label acceptance status and track contributors
    const contributorOutcomes = new Map<string, boolean>();

    for (const label of labels) {
      const isAccepted = label.value === majorityLabel && consensusReached;
      await prisma.label.update({
        where: { id: label.id },
        data: isAccepted
          ? {
              isAccepted: true,
              isRejected: false,
              rejectionReason: null,
            }
          : {
              isAccepted: false,
              isRejected: true,
              rejectionReason: 'Does not match consensus',
            },
      });
      contributorOutcomes.set(label.contributorId, isAccepted);
    }

    // Update contributor statistics & accuracy rates
    for (const [contributorId, isAccepted] of contributorOutcomes.entries()) {
      if (isAccepted) {
        await prisma.user.update({
          where: { id: contributorId },
          data: {
            tasksCompleted: { increment: 1 },
          },
        });
      }

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
    }

    // Update task status
    await prisma.task.update({
      where: { id: taskId },
      data: consensusReached
        ? {
            status: TaskStatus.VALIDATED,
            completedAt: new Date(),
          }
        : {
            status: TaskStatus.REJECTED,
          },
    });

    logger.info(
      `Task ${taskId} validated. Consensus: ${consensusReached}, Score: ${consensusScore.toFixed(2)}`
    );

    return {
      isValid: consensusReached,
      score: consensusScore,
      consensusReached,
      majorityLabel: consensusReached ? majorityLabel : undefined,
    };
  }

  /**
   * Calculate inter-annotator agreement (Cohen's Kappa)
   */
  async calculateInterAnnotatorAgreement(taskId: string): Promise<number> {
    const labels = await prisma.label.findMany({
      where: { taskId },
    });

    if (labels.length < 2) {
      return 0;
    }

    // Simple agreement calculation (percentage of agreeing labels)
    const labelCounts = new Map<string, number>();
    labels.forEach((label) => {
      const count = labelCounts.get(label.value) || 0;
      labelCounts.set(label.value, count + 1);
    });

    let maxAgreement = 0;
    labelCounts.forEach((count) => {
      const agreement = count / labels.length;
      if (agreement > maxAgreement) {
        maxAgreement = agreement;
      }
    });

    return maxAgreement;
  }
}

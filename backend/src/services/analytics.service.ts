import { prisma } from '../config/prisma.js';
import { TaskStatus } from '../types/index.js';

export class AnalyticsService {
  /**
   * Get dashboard statistics
   */
  async getDashboardStats() {
    const [
      totalUsers,
      activeUsers,
      totalTasks,
      completedTasks,
      totalDatasets,
      totalLabels,
      acceptedLabels,
      rejectedLabels,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.task.count(),
      prisma.task.count({ where: { status: TaskStatus.COMPLETED } }),
      prisma.dataset.count(),
      prisma.label.count(),
      prisma.label.count({ where: { isAccepted: true } }),
      prisma.label.count({ where: { isRejected: true } }),
    ]);

    // Task status distribution
    const taskStatusCounts = await prisma.task.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    // Recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentLabels = await prisma.label.count({
      where: { createdAt: { gte: sevenDaysAgo } },
    });

    const overallAccuracy = totalLabels > 0 ? (acceptedLabels / totalLabels) * 100 : 0;

    return {
      overview: {
        totalUsers,
        activeUsers,
        totalTasks,
        completedTasks,
        totalDatasets,
        totalLabels,
        acceptedLabels,
        rejectedLabels,
        totalAccepted: acceptedLabels,
        totalRejected: rejectedLabels,
        overallAccuracy: overallAccuracy.toFixed(2),
      },
      taskDistribution: taskStatusCounts.map((item) => ({
        status: item.status,
        count: item._count.status,
      })),
      recentActivity: {
        labelsLastWeek: recentLabels,
      },
    };
  }

  /**
   * Get user performance metrics
   */
  async getUserPerformance(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return null;
    }

    const totalLabels = await prisma.label.count({
      where: { contributorId: userId },
    });

    const acceptedLabels = await prisma.label.count({
      where: { contributorId: userId, isAccepted: true },
    });

    const rejectedLabels = await prisma.label.count({
      where: { contributorId: userId, isRejected: true },
    });

    // Average time spent per label
    const avgTimeResult = await prisma.label.aggregate({
      where: { contributorId: userId },
      _avg: {
        timeSpentSeconds: true,
      },
    });

    // Labels over time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const labelsOverTime = await prisma.$queryRaw<Array<{ date: Date; count: bigint }>>`
      SELECT DATE_TRUNC('day', "createdAt") AS date, COUNT(*) AS count
      FROM labels
      WHERE "contributorId" = ${userId}
      AND "createdAt" >= ${thirtyDaysAgo}
      GROUP BY DATE_TRUNC('day', "createdAt")
      ORDER BY DATE_TRUNC('day', "createdAt") ASC
    `;

    return {
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      statistics: {
        totalLabels,
        acceptedLabels,
        rejectedLabels,
        accuracyRate: totalLabels > 0 ? ((acceptedLabels / totalLabels) * 100).toFixed(2) : '0',
        averageTimePerLabel: avgTimeResult._avg.timeSpentSeconds || 0,
        totalEarnings: user.totalEarnings,
      },
      labelsOverTime: labelsOverTime.map((item) => ({
        date: item.date,
        count: Number(item.count),
      })),
    };
  }

  /**
   * Get quality metrics
   */
  async getQualityMetrics() {
    // Average consensus scores
    const tasks = await prisma.task.findMany({
      where: { status: TaskStatus.VALIDATED },
      include: { labels: true },
    });

    let totalConsensusScore = 0;
    let validatedTasksCount = 0;

    for (const task of tasks) {
      if (task.labels.length >= task.requiredLabels) {
        const labelCounts = new Map<string, number>();
        task.labels.forEach((label) => {
          const count = labelCounts.get(label.value) || 0;
          labelCounts.set(label.value, count + 1);
        });

        let maxCount = 0;
        labelCounts.forEach((count) => {
          if (count > maxCount) {
            maxCount = count;
          }
        });

        const consensusScore = maxCount / task.labels.length;
        totalConsensusScore += consensusScore;
        validatedTasksCount++;
      }
    }

    const averageConsensusScore =
      validatedTasksCount > 0 ? totalConsensusScore / validatedTasksCount : 0;

    // Top performers
    const topPerformers = await prisma.user.findMany({
      where: { isActive: true },
      orderBy: { accuracyRate: 'desc' },
      take: 10,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        accuracyRate: true,
        tasksCompleted: true,
      },
    });

    return {
      averageConsensusScore: averageConsensusScore.toFixed(2),
      validatedTasks: validatedTasksCount,
      topPerformers,
    };
  }
}

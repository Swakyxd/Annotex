import { prisma } from '../config/prisma.js';
import { TaskStatus, UserRole } from '../types/index.js';

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
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.task.count(),
      prisma.task.count({ where: { status: TaskStatus.COMPLETED } }),
      prisma.dataset.count(),
      prisma.label.count(),
      prisma.label.count({ where: { isAccepted: true } }),
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

    const [acceptedLabels, rejectedLabels] = await Promise.all([
      prisma.label.count({ where: { contributorId: userId, isAccepted: true } }),
      prisma.label.count({ where: { contributorId: userId, isRejected: true } }),
    ]);
    const reviewedLabels = acceptedLabels + rejectedLabels;

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
        accuracyRate: reviewedLabels > 0 ? ((acceptedLabels / reviewedLabels) * 100).toFixed(1) : 'N/A',
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
    // Validated status is the source of truth for completed validation. The
    // label-count check previously excluded valid tasks when their labels were
    // not returned as expected by the relation query.
    const tasks = await prisma.task.findMany({
      where: { status: TaskStatus.VALIDATED },
      include: { labels: true },
    });

    let totalConsensusScore = 0;
    let consensusTaskCount = 0;

    for (const task of tasks) {
      if (task.labels.length === 0) {
        continue;
      }

      const labelCounts = new Map<string, number>();
      task.labels.forEach((label) => {
        labelCounts.set(label.value, (labelCounts.get(label.value) || 0) + 1);
      });

      const maxCount = Math.max(...labelCounts.values());
      totalConsensusScore += maxCount / task.labels.length;
      consensusTaskCount++;
    }

    const averageConsensusScore =
      consensusTaskCount > 0 ? totalConsensusScore / consensusTaskCount : 0;

    const [contributors, submittedCounts, acceptedCounts, reviewedCounts] = await Promise.all([
      prisma.user.findMany({
        where: { role: UserRole.CONTRIBUTOR, isActive: true },
        select: { id: true, firstName: true, lastName: true },
      }),
      prisma.label.groupBy({
        by: ['contributorId'],
        _count: { _all: true },
      }),
      prisma.label.groupBy({
        by: ['contributorId'],
        where: { isAccepted: true },
        _count: { _all: true },
      }),
      prisma.label.groupBy({
        by: ['contributorId'],
        where: { OR: [{ isAccepted: true }, { isRejected: true }] },
        _count: { _all: true },
      }),
    ]);

    const submittedByContributor = new Map(
      submittedCounts.map((item) => [item.contributorId, item._count._all])
    );
    const acceptedByContributor = new Map(
      acceptedCounts.map((item) => [item.contributorId, item._count._all])
    );
    const reviewedByContributor = new Map(
      reviewedCounts.map((item) => [item.contributorId, item._count._all])
    );

    const contributorsWithPerformance = contributors
      .map((contributor) => {
        const labelsSubmitted = submittedByContributor.get(contributor.id) || 0;
        const acceptedLabels = acceptedByContributor.get(contributor.id) || 0;
        const reviewedLabels = reviewedByContributor.get(contributor.id) || 0;

        return {
          ...contributor,
          accuracyRate:
            reviewedLabels > 0 ? Number(((acceptedLabels / reviewedLabels) * 100).toFixed(1)) : null,
          tasksCompleted: labelsSubmitted,
          labelsSubmitted,
          reviewedLabels,
        };
      })
      .filter((contributor) => contributor.labelsSubmitted > 0);
    const topPerformers = contributorsWithPerformance
      .sort((left, right) => (right.accuracyRate ?? -1) - (left.accuracyRate ?? -1))
      .slice(0, 10);

    return {
      averageConsensusScore: averageConsensusScore.toFixed(2),
      validatedTasks: tasks.length,
      activeContributors: contributorsWithPerformance.length,
      topPerformers,
    };
  }
}

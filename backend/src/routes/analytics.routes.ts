import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { UserRole } from '../types/index.js';

const router = Router();
const analyticsController = new AnalyticsController();

/**
 * @swagger
 * /analytics/dashboard:
 *   get:
 *     summary: Get dashboard analytics (Admin only)
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard analytics data
 */
router.get(
  '/dashboard',
  authenticate,
  authorize(UserRole.ADMIN),
  analyticsController.getDashboardStats
);

/**
 * @swagger
 * /analytics/user-performance:
 *   get:
 *     summary: Get current user performance metrics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User performance metrics
 */
router.get(
  '/user-performance',
  authenticate,
  analyticsController.getUserPerformance
);

/**
 * @swagger
 * /analytics/quality-metrics:
 *   get:
 *     summary: Get quality metrics (Admin only)
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quality metrics
 */
router.get(
  '/quality-metrics',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.VALIDATOR),
  analyticsController.getQualityMetrics
);

export default router;

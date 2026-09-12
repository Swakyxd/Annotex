import { Router } from 'express';
import { body, param } from 'express-validator';
import { LabelController } from '../controllers/label.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validation.js';
import { UserRole } from '../types/index.js';

const router = Router();
const labelController = new LabelController();

/**
 * @swagger
 * /labels:
 *   post:
 *     summary: Submit a label for a task
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *               - value
 *             properties:
 *               taskId:
 *                 type: string
 *               value:
 *                 type: string
 *               confidence:
 *                 type: number
 *               timeSpentSeconds:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Label submitted successfully
 */
router.post(
  '/',
  authenticate,
  authorize(UserRole.CONTRIBUTOR, UserRole.VALIDATOR),
  validate([
    body('taskId').isUUID(),
    body('recordId').optional().isUUID(),
    body('value').trim().notEmpty(),
    body('confidence').optional().isFloat({ min: 0, max: 1 }),
    body('timeSpentSeconds').optional().isInt({ min: 0 }),
  ]),
  labelController.submitLabel
);

router.get(
  '/history',
  authenticate,
  authorize(UserRole.CONTRIBUTOR, UserRole.VALIDATOR, UserRole.ADMIN),
  labelController.getLabelHistory
);

/**
 * @swagger
 * /labels/{id}:
 *   get:
 *     summary: Get label by ID
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Label details
 */
router.get(
  '/:id',
  authenticate,
  validate([param('id').isUUID()]),
  labelController.getLabelById
);

/**
 * @swagger
 * /labels/task/{taskId}:
 *   get:
 *     summary: Get all labels for a task
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of labels for the task
 */
router.get(
  '/task/:taskId',
  authenticate,
  validate([param('taskId').isUUID()]),
  labelController.getTaskLabels
);

router.post(
  '/:id/approve',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.VALIDATOR),
  validate([param('id').isUUID()]),
  labelController.approveLabel
);

router.post(
  '/:id/reject',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.VALIDATOR),
  validate([
    param('id').isUUID(),
    body('reason').optional().trim().isLength({ min: 3, max: 300 }),
  ]),
  labelController.rejectLabel
);

router.post(
  '/:id/validate',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.VALIDATOR),
  validate([param('id').isUUID()]),
  labelController.validateLabel
);

export default router;

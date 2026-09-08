import { Router } from 'express';
import { body, param } from 'express-validator';
import { TaskController } from '../controllers/task.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validation.js';
import { UserRole } from '../types/index.js';

const router = Router();
const taskController = new TaskController();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get('/', authenticate, taskController.getAllTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task (Admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - datasetId
 *               - reward
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               datasetId:
 *                 type: string
 *               reward:
 *                 type: number
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post(
  '/',
  authenticate,
  authorize(UserRole.ADMIN),
  validate([
    body('title').trim().notEmpty().isLength({ max: 255 }),
    body('description').trim().notEmpty(),
    body('datasetId').isUUID(),
    body('reward').isFloat({ min: 0 }),
    body('requiredLabels').optional().isInt({ min: 1, max: 10 }),
    body('consensusThreshold').optional().isFloat({ min: 0.5, max: 1.0 }),
  ]),
  taskController.createTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
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
 *         description: Task details
 */
router.get(
  '/:id',
  authenticate,
  validate([param('id').isUUID()]),
  taskController.getTaskById
);

router.get(
  '/:id/records',
  authenticate,
  validate([param('id').isUUID()]),
  taskController.getTaskRecords
);

/**
 * @swagger
 * /tasks/{id}/assign:
 *   post:
 *     summary: Assign task to current user
 *     tags: [Tasks]
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
 *         description: Task assigned successfully
 */
router.post(
  '/:id/assign',
  authenticate,
  validate([param('id').isUUID()]),
  taskController.assignTask
);

router.delete(
  '/:id/assign',
  authenticate,
  validate([param('id').isUUID()]),
  taskController.unassignTask
);

export default router;

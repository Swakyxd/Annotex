import { Router } from 'express';
import { body, param } from 'express-validator';
import { PublicKey } from '@solana/web3.js';
import { UserController } from '../controllers/user.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validation.js';
import { UserRole } from '../types/index.js';

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter by role (e.g. "contributor")
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', authenticate, authorize(UserRole.ADMIN), userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
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
 *         description: User details
 */
router.get(
  '/:id',
  authenticate,
  validate([param('id').isUUID()]),
  userController.getUserById
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               walletAddress:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put(
  '/:id',
  authenticate,
  validate([
    param('id').isUUID(),
    body('firstName').optional().trim().isLength({ max: 100 }),
    body('lastName').optional().trim().isLength({ max: 100 }),
    body('walletAddress')
      .optional()
      .custom((value: string) => {
        try {
          new PublicKey(value);
          return true;
        } catch {
          throw new Error('walletAddress must be a valid Solana public key');
        }
      }),
  ]),
  userController.updateUser
);

/**
 * @swagger
 * /users/{id}/stats:
 *   get:
 *     summary: Get user statistics
 *     tags: [Users]
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
 *         description: User statistics
 */
router.get(
  '/:id/stats',
  authenticate,
  validate([param('id').isUUID()]),
  userController.getUserStats
);

/**
 * @swagger
 * /users/{id}/promote:
 *   patch:
 *     summary: Promote a contributor to validator (Admin only)
 *     tags: [Users]
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
 *         description: User promoted to validator successfully
 *       400:
 *         description: User is not a contributor
 *       404:
 *         description: User not found
 */
router.patch(
  '/:id/promote',
  authenticate,
  authorize(UserRole.ADMIN),
  validate([param('id').isUUID()]),
  userController.promoteToValidator
);

/**
 * @swagger
 * /users/{id}/demote:
 *   patch:
 *     summary: Demote a validator back to contributor (Admin only)
 *     tags: [Users]
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
 *         description: User demoted to contributor successfully
 *       400:
 *         description: User is not a validator
 *       404:
 *         description: User not found
 */
router.patch(
  '/:id/demote',
  authenticate,
  authorize(UserRole.ADMIN),
  validate([param('id').isUUID()]),
  userController.demoteToContributor
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user (Admin only)
 *     tags: [Users]
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
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  validate([param('id').isUUID()]),
  userController.deleteUser
);

export default router;

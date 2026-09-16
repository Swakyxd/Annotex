import { Router } from 'express';
import { body } from 'express-validator';
import { PayoutController } from '../controllers/payout.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validation.js';
import { UserRole } from '../types/index.js';

const router = Router();
const payoutController = new PayoutController();

router.post(
  '/calculate',
  authenticate,
  authorize(UserRole.ADMIN),
  validate([body('datasetId').optional().isUUID()]),
  payoutController.calculatePayouts
);

router.post(
  '/trigger',
  authenticate,
  authorize(UserRole.ADMIN),
  validate([
    body('userId').isUUID(),
    body('datasetId').optional().isUUID(),
  ]),
  payoutController.triggerPayout
);

router.get(
  '/pending',
  authenticate,
  authorize(UserRole.CONTRIBUTOR, UserRole.VALIDATOR, UserRole.ADMIN),
  payoutController.getPendingPayouts
);

export default router;

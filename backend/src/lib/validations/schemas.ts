import { PublicKey } from '@solana/web3.js';
import { z } from 'zod';
import { UserRole } from '../../types/index.js';

const uuid = z.string().uuid();
const optionalString = z.string().trim().optional();

const solanaAddress = z.string().trim().min(1).refine(
  (value) => {
    try {
      new PublicKey(value);
      return true;
    } catch {
      return false;
    }
  },
  { message: 'Must be a valid Solana public key' }
);

const jsonField = <T extends z.ZodType>(schema: T) =>
  z.preprocess((value) => {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    if (typeof value !== 'string') {
      return value;
    }

    try {
      return JSON.parse(value) as unknown;
    } catch {
      return value;
    }
  }, schema);

export const RegisterSchema = z
  .object({
    email: z.string().trim().email(),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
    // Signup always creates a contributor; promotion to validator is an admin-only action
    // (see UserService.promoteToValidator).
    role: z.literal(UserRole.CONTRIBUTOR).optional(),
  })
  .strict();

export const LoginSchema = z
  .object({
    email: z.string().trim().email(),
    password: z.string().min(1),
  })
  .strict();

export const RefreshTokenSchema = z
  .object({
    refreshToken: z.string().min(1),
  })
  .strict();

export const TaskCreateSchema = z
  .object({
    title: z.string().trim().min(1).max(255),
    description: z.string().trim().min(1),
    datasetId: uuid,
    reward: z.coerce.number().finite().min(0),
    requiredLabels: z.coerce.number().int().min(1).max(10).optional(),
    consensusThreshold: z.coerce.number().finite().min(0.5).max(1).optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict();

export const LabelSubmitSchema = z
  .object({
    taskId: uuid,
    recordId: uuid.optional(),
    value: z.string().trim().min(1),
    confidence: z.coerce.number().finite().min(0).max(1).optional(),
    timeSpentSeconds: z.coerce.number().int().min(0).optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict();

export const LabelRejectSchema = z
  .object({
    reason: z.string().trim().min(3).max(300).optional(),
  })
  .strict();

export const LabelApprovalSchema = z.object({}).strict();

export const LabelValidationSchema = z
  .object({
    isAccepted: z.boolean().optional(),
    action: z.enum(['approve', 'reject']).optional(),
    reason: z.string().trim().min(3).max(300).optional(),
  })
  .strict()
  .refine((value) => value.isAccepted !== undefined || value.action !== undefined, {
    message: 'Either isAccepted or action is required',
    path: ['isAccepted'],
  });

export const DatasetUploadSchema = z
  .object({
    name: z.string().trim().min(1).max(255),
    description: optionalString,
    labelType: z.enum(['text', 'category', 'multi-select']).optional(),
    labelOptions: jsonField(z.array(z.string()).optional()),
    labelSchema: jsonField(z.record(z.unknown()).optional()),
    totalRewardSOL: z.coerce.number().finite().min(0).optional(),
    maxLabelsPerRecord: z.coerce.number().int().min(1).max(10).optional(),
    consensusThreshold: z.coerce.number().finite().min(0.5).max(1).optional(),
    deadline: z.coerce.date().optional().nullable(),
  })
  .strict();

export const DatasetPublishSchema = z
  .object({
    batchSize: z.coerce.number().int().min(1).optional(),
  })
  .strict();

export const ConnectWalletSchema = z
  .object({
    walletAddress: solanaAddress,
  })
  .strict();

export const ProcessPayoutSchema = z
  .object({
    userId: uuid,
    amount: z.coerce.number().finite().min(0.001),
  })
  .strict();

export const ProjectFundingSchema = z
  .object({
    datasetId: uuid,
    amountSOL: z.coerce.number().finite().min(0.000001),
    label: optionalString,
    message: optionalString,
    memo: optionalString,
  })
  .strict();

export const ConfirmTransferSchema = z
  .object({
    transactionId: uuid,
  })
  .strict();

export const CalculatePayoutsSchema = z
  .object({
    datasetId: uuid.optional(),
  })
  .strict();

export const TriggerPayoutSchema = z
  .object({
    userId: uuid,
    datasetId: uuid.optional(),
  })
  .strict();

export const UserUpdateSchema = z
  .object({
    firstName: z.string().trim().min(1).max(100).optional(),
    lastName: z.string().trim().min(1).max(100).optional(),
    walletAddress: solanaAddress.nullable().optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field is required',
  });

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type RefreshTokenInput = z.infer<typeof RefreshTokenSchema>;
export type TaskCreateInput = z.infer<typeof TaskCreateSchema>;
export type LabelSubmitInput = z.infer<typeof LabelSubmitSchema>;
export type LabelRejectInput = z.infer<typeof LabelRejectSchema>;
export type LabelApprovalInput = z.infer<typeof LabelApprovalSchema>;
export type LabelValidationInput = z.infer<typeof LabelValidationSchema>;
export type DatasetUploadInput = z.infer<typeof DatasetUploadSchema>;
export type DatasetPublishInput = z.infer<typeof DatasetPublishSchema>;
export type ConnectWalletInput = z.infer<typeof ConnectWalletSchema>;
export type ProcessPayoutInput = z.infer<typeof ProcessPayoutSchema>;
export type ProjectFundingInput = z.infer<typeof ProjectFundingSchema>;
export type ConfirmTransferInput = z.infer<typeof ConfirmTransferSchema>;
export type CalculatePayoutsInput = z.infer<typeof CalculatePayoutsSchema>;
export type TriggerPayoutInput = z.infer<typeof TriggerPayoutSchema>;
export type UserUpdateInput = z.infer<typeof UserUpdateSchema>;

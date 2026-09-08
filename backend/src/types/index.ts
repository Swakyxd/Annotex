export enum UserRole {
  ADMIN = 'admin',
  CONTRIBUTOR = 'contributor',
  VALIDATOR = 'validator',
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  LABELED = 'labeled',
  COMPLETED = 'completed',
  VALIDATED = 'validated',
  REJECTED = 'rejected',
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum DatasetFormat {
  CSV = 'csv',
  JSON = 'json',
  IMAGE = 'image',
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
  timestamp: string;
}

export interface ValidationResult {
  isValid: boolean;
  score: number;
  consensusReached: boolean;
  majorityLabel?: string;
}

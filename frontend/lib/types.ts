export type UserRole = "admin" | "contributor" | "validator";

export type AuthMode = "login" | "register";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
  timestamp: string;
};

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  walletAddress?: string | null;
  isActive?: boolean;
  totalEarnings?: number;
  tasksCompleted?: number;
  accuracyRate?: number;
  createdAt?: string;
};

export type AuthPayload = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = LoginRequest & {
  firstName: string;
  lastName: string;
  // Signup always creates a contributor; promotion to validator is an admin-only action.
  role: "contributor";
};
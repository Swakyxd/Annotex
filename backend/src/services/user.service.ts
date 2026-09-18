import { AppError } from '../middlewares/errorHandler.js';
import { prisma } from '../config/prisma.js';
import { UserRole } from '../types/index.js';

export class UserService {
  /**
   * Get all users with pagination
   */
  async getAllUsers(page: number = 1, limit: number = 10, role?: string) {
    const skip = (page - 1) * limit;
    const where = role ? { role } : undefined;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          walletAddress: true,
          isActive: true,
          totalEarnings: true,
          tasksCompleted: true,
          accuracyRate: true,
          createdAt: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        walletAddress: true,
        isActive: true,
        totalEarnings: true,
        tasksCompleted: true,
        accuracyRate: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  /**
   * Update user profile
   */
  async updateUser(
    userId: string,
    updateData: {
      email?: string;
      firstName?: string;
      lastName?: string;
      walletAddress?: string | null;
      password?: string;
      role?: string;
      isActive?: boolean;
      totalEarnings?: number;
      tasksCompleted?: number;
      accuracyRate?: number;
    },
    requestingUserId: string
  ) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Users can only update their own profile unless they are admin
    if (userId !== requestingUserId) {
      const requestingUser = await prisma.user.findUnique({ where: { id: requestingUserId } });
      if (requestingUser?.role !== UserRole.ADMIN) {
        throw new AppError('Unauthorized to update this user', 403);
      }
    }

    // Prevent updating sensitive fields
    const { password, role, isActive, totalEarnings, tasksCompleted, accuracyRate, ...safeUpdateData } = updateData;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: safeUpdateData,
    });

    const { password: _password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  /**
   * Get user statistics
   */
  async getUserStats(userId: string) {
    const user = await this.getUserById(userId);

    // Get label statistics
    const totalLabels = await prisma.label.count({
      where: { contributorId: userId },
    });

    const acceptedLabels = await prisma.label.count({
      where: { contributorId: userId, isAccepted: true },
    });

    const rejectedLabels = await prisma.label.count({
      where: { contributorId: userId, isRejected: true },
    });

    // Get transaction statistics
    const totalEarnings = await prisma.transaction.aggregate({
      where: {
        userId,
        status: 'completed',
      },
      _sum: {
        amount: true,
      },
    });

    // Calculate accuracy rate
    const accuracyRate = totalLabels > 0 ? (acceptedLabels / totalLabels) * 100 : 0;

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      statistics: {
        totalLabels,
        acceptedLabels,
        rejectedLabels,
        accuracyRate: accuracyRate.toFixed(2),
        totalEarnings: totalEarnings._sum.amount || 0,
        tasksCompleted: user.tasksCompleted,
      },
    };
  }

  /**
   * Promote a contributor to validator (admin-only; enforced at the route level).
   * The new role takes effect on the user's next login/token refresh.
   */
  async promoteToValidator(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.role !== UserRole.CONTRIBUTOR) {
      throw new AppError('Only contributors can be promoted to validator', 400);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: UserRole.VALIDATOR },
    });

    const { password: _password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  /**
   * Demote a validator back to contributor (admin-only; enforced at the route level).
   */
  async demoteToContributor(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.role !== UserRole.VALIDATOR) {
      throw new AppError('Only validators can be demoted to contributor', 400);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: UserRole.CONTRIBUTOR },
    });

    const { password: _password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  /**
   * Delete a user by ID
   */
  async deleteUser(userId: string, requesterId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError('User not found', 404);

    // Deleting yourself takes effect immediately while your session keeps a
    // token for a user that no longer exists, so every later request fails and
    // the UI looks like the data is gone rather than like an account was removed.
    if (userId === requesterId) {
      throw new AppError('You cannot delete your own account', 400);
    }

    // Promotion to admin is only reachable from an existing admin
    // (authorize(UserRole.ADMIN) on every role route) and registration always
    // assigns 'contributor', so removing the last admin locks every user out of
    // administration permanently, recoverable only by direct database access.
    if (user.role === UserRole.ADMIN) {
      const admins = await prisma.user.count({ where: { role: UserRole.ADMIN } });
      if (admins <= 1) {
        throw new AppError('Cannot delete the last remaining admin', 400);
      }
    }

    // Ensure we delete dependent data first to avoid foreign key constraints
    await prisma.label.deleteMany({ where: { contributorId: userId } });
    await prisma.transaction.deleteMany({ where: { userId } });

    await prisma.user.delete({ where: { id: userId } });
  }
}

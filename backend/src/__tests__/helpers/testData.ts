import bcrypt from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';

import { config } from '../../config/index.js';
import { prisma } from '../../config/prisma.js';
import { UserRole } from '../../types/index.js';

/**
 * Every fixture email lives in the @annotex.dev namespace because cleanup
 * targets it — `deleteMany({ email: { contains: '@annotex.dev' } })`. A fixture
 * outside that namespace survives the suite and pollutes later runs.
 */
export const TEST_EMAIL_DOMAIN = '@annotex.dev';

export function uniqueEmail(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${TEST_EMAIL_DOMAIN}`;
}

export function authHeaders(token: string): { Authorization: string } {
  return { Authorization: `Bearer ${token}` };
}

/**
 * Mints an access token the same way AuthService.generateTokens does. Kept in
 * step with backend/src/services/auth.service.ts — if the claim shape changes
 * there, `authenticate` will reject these tokens and every suite using them
 * fails at once.
 */
export function signAccessToken(payload: {
  userId: string;
  email: string;
  role: UserRole;
}): string {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn as SignOptions['expiresIn'],
  });
}

export function signRefreshToken(payload: {
  userId: string;
  email: string;
  role: UserRole;
}): string {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn as SignOptions['expiresIn'],
  });
}

export interface SeededUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  accessToken: string;
  headers: { Authorization: string };
}

/**
 * Creates a user directly in the database at any role and returns a usable
 * access token.
 *
 * Going through the API instead would not work for role coverage: registration
 * always assigns `contributor`, and promotion to `validator` needs an existing
 * admin, while nothing in the app can create an admin at all. Seeding is the
 * only way to get an admin or validator fixture.
 *
 * `authenticate` re-reads the user row on every request and authorises on the
 * stored role rather than the token claim, so the row is what actually matters.
 */
export async function seedUser(
  role: UserRole = UserRole.CONTRIBUTOR,
  overrides: Partial<{ email: string; password: string; isActive: boolean }> = {}
): Promise<SeededUser> {
  const email = overrides.email ?? uniqueEmail(role);
  const password = overrides.password ?? 'Password123';

  const user = await prisma.user.create({
    data: {
      email,
      // Cost 12 matches AuthService.register. It is deliberately slow, so a
      // suite seeding many users will feel it — reuse fixtures where you can.
      password: await bcrypt.hash(password, 12),
      firstName: 'Test',
      lastName: role,
      role,
      isActive: overrides.isActive ?? true,
    },
  });

  const accessToken = signAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role as UserRole,
  });

  return {
    id: user.id,
    email: user.email,
    password,
    role: user.role as UserRole,
    accessToken,
    headers: authHeaders(accessToken),
  };
}

/**
 * Removes every fixture user. Call in beforeEach and afterAll.
 *
 * Deleting the user cascades to their labels and transactions via
 * UserService-adjacent relations, so this is enough to reset between suites.
 */
export async function cleanupTestUsers(): Promise<void> {
  await prisma.user.deleteMany({
    where: { email: { contains: TEST_EMAIL_DOMAIN } },
  });
}

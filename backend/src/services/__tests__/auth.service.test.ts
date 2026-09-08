import { afterAll, beforeEach, describe, expect, it } from '@jest/globals';
import bcrypt from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';

import { config } from '../../config/index.js';
import { disconnectPrisma, prisma } from '../../config/prisma.js';
import { UserRole } from '../../types/index.js';
import { AuthService } from '../auth.service.js';

function uniqueEmail(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@annotex.dev`;
}

describe('AuthService', () => {
  const service = new AuthService();

  beforeEach(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          contains: '@annotex.dev',
        },
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          contains: '@annotex.dev',
        },
      },
    });
    await disconnectPrisma();
  });

  it('register hashes the password and returns tokens without exposing the password', async () => {
    const email = uniqueEmail('register');

    const result = await service.register({
      email,
      password: 'Password123',
      firstName: 'Ava',
      lastName: 'Patel',
    });

    expect(result.user.email).toBe(email);
    expect(result.user).toEqual(expect.not.objectContaining({ password: expect.anything() }));
    expect(result.accessToken).toEqual(expect.any(String));
    expect(result.refreshToken).toEqual(expect.any(String));

    const dbUser = await prisma.user.findUnique({ where: { email } });
    expect(dbUser).not.toBeNull();
    expect(dbUser?.password).not.toBe('Password123');
    expect(await bcrypt.compare('Password123', dbUser!.password)).toBe(true);
  });

  it('register rejects duplicate emails', async () => {
    const email = uniqueEmail('duplicate');

    await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash('Password123', 12),
        firstName: 'Ava',
        lastName: 'Patel',
        role: UserRole.CONTRIBUTOR,
      },
    });

    await expect(
      service.register({
        email,
        password: 'Password123',
        firstName: 'Ava',
        lastName: 'Patel',
      })
    ).rejects.toMatchObject({
      message: 'User with this email already exists',
      statusCode: 409,
    });
  });

  it('login rejects invalid passwords', async () => {
    const email = uniqueEmail('invalid-password');

    await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash('Password123', 12),
        firstName: 'Ava',
        lastName: 'Patel',
        role: UserRole.CONTRIBUTOR,
      },
    });

    await expect(service.login(email, 'WrongPassword123')).rejects.toMatchObject({
      message: 'The password you entered is incorrect',
      statusCode: 401,
    });
  });

  it('login identifies an email address with no account', async () => {
    await expect(service.login(uniqueEmail('missing'), 'Password123')).rejects.toMatchObject({
      message: 'No account was found for this email address',
      statusCode: 401,
    });
  });

  it('refreshToken rejects malformed tokens', async () => {
    await expect(service.refreshToken('not-a-real-token')).rejects.toMatchObject({
      message: 'Invalid refresh token',
      statusCode: 401,
    });
  });

  it('refreshToken returns a new token pair for an active user', async () => {
    const email = uniqueEmail('refresh');

    const user = await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash('Password123', 12),
        firstName: 'Ava',
        lastName: 'Patel',
        role: UserRole.CONTRIBUTOR,
      },
    });

    const refreshToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn as SignOptions['expiresIn'] }
    );

    const result = await service.refreshToken(refreshToken);

    expect(result.accessToken).toEqual(expect.any(String));
    expect(result.refreshToken).toEqual(expect.any(String));
  });

  it('getUserProfile throws when the user is missing', async () => {
    await expect(service.getUserProfile('7ee9ea54-8f50-4ef5-8f27-9d14516a9b6a')).rejects.toMatchObject({
      message: 'User not found',
      statusCode: 404,
    });
  });
});

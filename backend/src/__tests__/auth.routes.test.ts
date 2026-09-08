import { afterAll, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import bcrypt from 'bcrypt';
import type { Application } from 'express';
import jwt, { type SignOptions } from 'jsonwebtoken';
import request from 'supertest';

import { config } from '../config/index.js';
import { disconnectPrisma, prisma } from '../config/prisma.js';
import { UserRole } from '../types/index.js';

function uniqueEmail(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@annotex.dev`;
}

describe('Auth routes', () => {
  let app: Application;

  beforeAll(async () => {
    const { createTestApp } = await import('./helpers/createTestApp.js');
    app = await createTestApp();
  });

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

  it('registers a user successfully', async () => {
    const email = uniqueEmail('new-user');

    const response = await request(app).post('/api/v1/auth/register').send({
      email,
      password: 'Password123',
      firstName: 'Ava',
      lastName: 'Patel',
      role: 'contributor',
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.data.user.email).toBe(email);
    expect(response.body.data.user.password).toBeUndefined();
    expect(response.body.data.accessToken).toEqual(expect.any(String));
    expect(response.body.data.refreshToken).toEqual(expect.any(String));

    const dbUser = await prisma.user.findUnique({ where: { email } });
    expect(dbUser).not.toBeNull();
    expect(dbUser?.role).toBe(UserRole.CONTRIBUTOR);
  });

  it('rejects invalid register payloads through validation middleware', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({
      email: 'bad-email',
      password: 'short',
      firstName: '',
      lastName: '',
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Validation failed');
  });

  it('logs a user in with valid credentials', async () => {
    const email = uniqueEmail('login-user');
    const hashedPassword = await bcrypt.hash('Password123', 12);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: 'Ava',
        lastName: 'Patel',
        role: UserRole.CONTRIBUTOR,
      },
    });

    const response = await request(app).post('/api/v1/auth/login').send({
      email,
      password: 'Password123',
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.data.user.email).toBe(email);
    expect(response.body.data.accessToken).toEqual(expect.any(String));
  });

  it('refreshes a token pair when the refresh token is valid', async () => {
    const email = uniqueEmail('refresh-user');

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

    const response = await request(app).post('/api/v1/auth/refresh').send({
      refreshToken,
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.accessToken).toEqual(expect.any(String));
    expect(response.body.data.refreshToken).toEqual(expect.any(String));
  });

  it('returns the current user profile for an authenticated request', async () => {
    const email = uniqueEmail('me-user');

    const user = await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash('Password123', 12),
        firstName: 'Ava',
        lastName: 'Patel',
        role: UserRole.CONTRIBUTOR,
      },
    });

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn as SignOptions['expiresIn'] }
    );

    const response = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe(user.email);
    expect(response.body.data.firstName).toBe('Ava');
  });

  it('rejects unauthenticated profile requests', async () => {
    const response = await request(app).get('/api/v1/auth/me');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('No token provided');
  });
});

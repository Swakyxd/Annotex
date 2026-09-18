import 'reflect-metadata';
import fs from 'node:fs';
import path from 'node:path';
import { beforeEach, jest } from '@jest/globals';
import dotenv from 'dotenv';

process.env.DOTENV_CONFIG_QUIET = 'true';
process.env.NODE_ENV = 'test';
process.env.API_VERSION = 'v1';
process.env.JWT_SECRET = 'test-access-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.JWT_EXPIRES_IN = '1h';
process.env.JWT_REFRESH_EXPIRES_IN = '7d';
process.env.LOG_LEVEL = 'error';
process.env.BLOCKCHAIN_NETWORK = 'devnet';
process.env.SOLANA_RPC_URL = 'https://api.devnet.solana.com';
process.env.PROJECT_TREASURY_WALLET = '11111111111111111111111111111111';

// Load .env.test before anything imports config/index.ts or db.ts, both of
// which read DATABASE_URL at module scope. CI sets DATABASE_URL directly in the
// job env and ships no .env.test, so this is a no-op there.
//
// `override: true` matters: config/index.ts falls back to loading backend/.env,
// and without this a developer's own .env would win over the test database.
const envTestPath = path.resolve(process.cwd(), '.env.test');
if (fs.existsSync(envTestPath)) {
  dotenv.config({ path: envTestPath, override: true });
}

// These tests run against a REAL Postgres — there is no Prisma mock anywhere in
// this repo, and they call prisma.user.create() and prisma.user.deleteMany().
// Pointed at a shared or hosted database they will destroy real rows.
//
// backend/.env has historically held a Neon cloud URL, so failing loudly here is
// worth more than any single test this protects.
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL is not set.\n' +
      'Copy backend/.env.test.example to backend/.env.test, then start the local database:\n' +
      '  docker compose up -d db'
  );
}

const remoteHostMarkers = ['neon.tech', 'rds.amazonaws.com', 'supabase.co', 'render.com'];
const matchedRemote = remoteHostMarkers.find((marker) => databaseUrl.includes(marker));

if (matchedRemote) {
  throw new Error(
    `Refusing to run tests against what looks like a hosted database (${matchedRemote}).\n` +
      'These tests create and delete rows. Point DATABASE_URL at the local Docker Postgres:\n' +
      '  postgresql://annotex:annotex@localhost:5433/annotex_db?schema=public'
  );
}

beforeEach(() => {
  jest.clearAllMocks();
});

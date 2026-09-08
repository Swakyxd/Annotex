import 'reflect-metadata';
import { beforeEach, jest } from '@jest/globals';

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

beforeEach(() => {
  jest.clearAllMocks();
});

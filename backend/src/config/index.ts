import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const envCandidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), 'backend/.env'),
];

const resolvedEnvPath = envCandidates.find((candidatePath) => fs.existsSync(candidatePath));

// Load environment variables
if (resolvedEnvPath) {
  dotenv.config({ path: resolvedEnvPath });
} else {
  dotenv.config();
}

function parseCorsOrigins(value?: string): string[] | string {
  if (!value) {
    return 'http://localhost:3000';
  }

  const origins = value
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);

  if (origins.length <= 1) {
    return origins[0] || 'http://localhost:3000';
  }

  return origins;
}

function ensureProductionConfig(): void {
  if ((process.env.NODE_ENV || 'development') !== 'production') {
    return;
  }

  const requiredEnv: string[] = [
    'DATABASE_URL',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
    'CORS_ORIGIN',
    'PROJECT_TREASURY_WALLET',
  ];

  const missing = requiredEnv.filter((key) => !process.env[key] || process.env[key]?.trim() === '');
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables in production: ${missing.join(', ')}`);
  }

  const insecureDefaults = [
    ['JWT_SECRET', 'your-secret-key-min-32-characters-long'],
    ['JWT_REFRESH_SECRET', 'your-refresh-secret-key'],
  ] as const;

  const insecureKeys = insecureDefaults
    .filter(([key, value]) => process.env[key] === value)
    .map(([key]) => key);

  if (insecureKeys.length > 0) {
    throw new Error(`Refusing to start in production with insecure default values: ${insecureKeys.join(', ')}`);
  }
}

ensureProductionConfig();

/**
 * Application configuration
 */
export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  apiVersion: process.env.API_VERSION || 'v1',

  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'annotex',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'annotex_db',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-min-32-characters-long',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
  },

  blockchain: {
    network: process.env.BLOCKCHAIN_NETWORK || 'devnet',
    solanaRpcUrl: process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
    projectTreasuryWallet: process.env.PROJECT_TREASURY_WALLET || '',
    payoutTokenMint: process.env.PAYOUT_TOKEN_MINT || '',
  },

  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
    // Ceiling on what a .zip may expand to. The upload cap above bounds the
    // archive, not its contents.
    maxExtractedSize: parseInt(process.env.MAX_EXTRACTED_SIZE || '209715200', 10), // 200MB
    uploadPath: process.env.UPLOAD_PATH || 'uploads/',
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '300', 10),
  },

  cors: {
    origin: parseCorsOrigins(process.env.CORS_ORIGIN),
  },

  logging: {
    level: process.env.LOG_LEVEL || 'info',
    filePath: process.env.LOG_FILE_PATH || 'logs/',
  },
} as const;

export default config;

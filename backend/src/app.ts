import compression from 'compression';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/index.js';
import { morganStream } from './config/logger.js';
import { prisma } from './config/prisma.js';
import { swaggerSpec } from './config/swagger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { rateLimiter } from './middlewares/rateLimiter.js';
import routes from './routes/index.js';

/**
 * Initialize Express application with all middleware and routes
 */
export function initializeApp(app: Application): void {
  // Exactly one proxy hop: nginx on the same host. Without this every request
  // appears to come from 127.0.0.1, so express-rate-limit buckets the entire
  // internet together and authRateLimiter's max of 5 locks out all users at
  // once. `true` would be worse than the bug — it trusts the whole
  // X-Forwarded-For chain, letting any client spoof the left-most address.
  app.set('trust proxy', 1);

  // Security middleware
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );
  
  // CORS configuration
  app.use(cors({
    origin: config.cors.origin,
    credentials: true,
    optionsSuccessStatus: 200
  }));

  // Compression middleware
  app.use(compression());

  // Serve uploaded datasets and extracted image assets
  app.use('/uploads', express.static(path.resolve(config.upload.uploadPath)));

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // HTTP request logger
  if (config.env !== 'test') {
    app.use(morgan('combined', { stream: morganStream }));
  }

  // Rate limiting
  app.use(rateLimiter);

  // Health check endpoint.
  // This backs the container HEALTHCHECK and the deploy verification, so it has
  // to touch the database: reporting "healthy" while Postgres is unreachable
  // makes both of those meaningless.
  app.get('/health', async (_req: Request, res: Response) => {
    let database = 'up';
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch {
      database = 'down';
    }

    res.status(database === 'up' ? 200 : 503).json({
      status: database === 'up' ? 'healthy' : 'unhealthy',
      database,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.env
    });
  });

  // API Documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }'
  }));

  // API routes
  app.use(`/api/${config.apiVersion}`, routes);

  // 404 handler
  app.use(notFoundHandler);

  // Global error handler
  app.use(errorHandler);
}

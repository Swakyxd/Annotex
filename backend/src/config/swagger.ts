import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './index.js';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Annotex API Documentation',
      version: '1.0.0',
      description: 'RESTful API documentation for Annotex data labeling platform',
      contact: {
        name: 'Annotex Team',
        email: 'support@annotex.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `/api/${config.apiVersion}`,
        description: 'Current environment API server',
      },
      {
        url: `http://localhost:${config.port}/api/${config.apiVersion}`,
        description: 'Development local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Users', description: 'User management endpoints' },
      { name: 'Tasks', description: 'Task management endpoints' },
      { name: 'Datasets', description: 'Dataset management endpoints' },
      { name: 'Labels', description: 'Label submission endpoints' },
      { name: 'Analytics', description: 'Analytics and metrics endpoints' },
      { name: 'Blockchain', description: 'Blockchain transaction endpoints' },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/models/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);

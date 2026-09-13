import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { ZodError } from 'zod';
import { AppError } from './errorHandler.js';
import { ApiResponse } from '../types/index.js';

/**
 * Middleware to handle validation errors
 */
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      await Promise.all(validations.map(validation => validation.run(req)));

      const errors = validationResult(req);

      if (errors.isEmpty()) {
        next();
        return;
      }

      // Let controller-level Zod schemas provide the structured body errors.
      const requestErrors = errors.array();
      if (requestErrors.every(error => 'location' in error && error.location === 'body')) {
        next();
        return;
      }

      next(new AppError('Validation failed', 400, true));
    } catch (error) {
      next(error);
    }
  };

};

export const sendZodValidationError = (res: Response, error: ZodError): void => {
  const response: ApiResponse = {
    success: false,
    message: 'Validation failed',
    error: error.flatten(),
    timestamp: new Date().toISOString(),
  };

  res.status(400).json(response);
};

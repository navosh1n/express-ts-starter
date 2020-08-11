import { NextFunction, Request, Response } from 'express';
import logger from '../services/logger-service';
import { HttpError } from '../errors';

export const errorMiddleware = (
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.error(`${err.constructor.name}: ${err.message}. ${req.method}: ${req.originalUrl}`);

  (err instanceof HttpError)
    ? res.status(err.status).json(err)
    : res.status(500).json({
      error: err.constructor.name,
      status: 500,
      message: 'Internal Server Error',
    });
};

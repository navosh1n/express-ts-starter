import { NextFunction, Request, Response } from 'express';
import logger from '../services/logger-service';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  logger.info(`${req.method}: ${req.originalUrl}`);
  next();
};

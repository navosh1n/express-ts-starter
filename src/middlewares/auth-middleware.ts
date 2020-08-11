import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { UnauthorizedError } from '../errors';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.baseUrl === '/api'
      ? next(new UnauthorizedError())
      : res.redirect(401, config.pages.signIn);
  }
};

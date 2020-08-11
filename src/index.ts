import './dotenv';
import path from 'path';
import express from 'express';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import passport from 'passport';
import { App } from './app';
import config from './config';
import logger from './services/logger-service';
import { isProduction } from './utils/server';

/* middlewares */
import { AuthController } from './controllers/auth-controller';
import { UsersController } from './controllers/users-controller';

/* controllers */
import { loggerMiddleware } from './middlewares/logger-middleware';
import { errorMiddleware } from './middlewares/error-middleware';

/* pages */
import { HomePage } from './pages/home-page';
import { AuthPage } from './pages/auth-page';
import { HealthcheckPage } from './pages/healthcheck-page';

export default new App({
  port: config.server.port,
  middlewares: {
    begin: [
      express.json(),
      express.urlencoded({ extended: true }),
      cookieSession({
        secret: config.session.secret,
        name: 'sessionId',
        secure: isProduction(),
        maxAge: config.session.maxAge,
      }),
      passport.initialize(),
      passport.session(),
      helmet(),
      express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 }),
      loggerMiddleware,
    ],
    end: [
      errorMiddleware,
    ],
  },
  pages: [
    new HomePage(),
    new AuthPage(),
    new HealthcheckPage(),
  ],
  controllers: [
    new AuthController(),
    new UsersController(),
  ],
  settings: {
    views: path.join(__dirname, './views'),
    'view engine': 'ejs',
  },
}, logger).listen();

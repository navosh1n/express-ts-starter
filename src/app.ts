import express, { Application, ErrorRequestHandler, RequestHandler } from 'express';
import { Server } from 'http';
import { ILoggerService } from './services/logger-service';
import { IBaseRouter } from './core/base-router';

export class App {
  app: Application;
  port: number;

  constructor(config: AppConfig, private logger: ILoggerService = console) {
    this.app = express();
    this.port = config.port;

    this.setSettings(config.settings);
    this.initMiddlewares(config.middlewares?.begin);
    this.initPages(config.pages);
    this.initControllers(config.controllers);
    this.initMiddlewares(config.middlewares?.end);
  }

  private setSettings(settings: TSettings) {
    Object.keys(settings).forEach((key) => {
      this.app.set(key, settings[key]);
    });
  }

  private initMiddlewares(middlewares: TMiddleware[]) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private initPages(pages: IBaseRouter[]) {
    pages.forEach((page) => {
      page.enable && this.app.use('/', page.router);
    });
  }

  private initControllers(controllers: IBaseRouter[]) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }

  listen(): Server {
    return this.app.listen(this.port, () => {
      this.logger.info(`App listening on the http://localhost:${this.port}`);
    });
  }
}

interface AppConfig {
  middlewares?: {
    begin?: TMiddleware[];
    end?: TMiddleware[];
  };
  pages?: IBaseRouter[];
  controllers?: IBaseRouter[];
  port: number;
  settings?: TSettings;
}

type TSettings = Record<string, any>;

type TMiddleware = RequestHandler | ErrorRequestHandler;

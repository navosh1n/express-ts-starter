import { RequestHandler, Router } from 'express';

export abstract class BaseRouter implements IBaseRouter {
  router = Router();
  path: string;
  enable = true;

  protected constructor(config: IBaseRouterConfig) {
    this.path = config.path;
    this.initMiddlewares(config.middlewares?.begin);
    this.initRoutes();
    this.initMiddlewares(config.middlewares?.end);
  }

  abstract initRoutes(): void;

  get(url: string, ...handlers: RequestHandler[]): void {
    this.router.get(`${this.path}${url}`, ...handlers);
  }

  post(url: string, ...handlers: RequestHandler[]): void {
    this.router.post(`${this.path}${url}`, ...handlers);
  }

  put(url: string, ...handlers: RequestHandler[]): void {
    this.router.put(`${this.path}${url}`, ...handlers);
  }

  delete(url: string, ...handlers: RequestHandler[]): void {
    this.router.delete(`${this.path}${url}`, ...handlers);
  }

  private initMiddlewares(middlewares: RequestHandler[] = []) {
    middlewares.forEach((middleware) => {
      this.router.use(this.path, middleware);
    });
  }
}

export interface IBaseRouter {
  router: Router;
  path: string;
  enable: boolean;
}

export interface IBaseRouterConfig {
  path: string;
  middlewares?: {
    begin?: RequestHandler[];
    end?: RequestHandler[];
  }
}

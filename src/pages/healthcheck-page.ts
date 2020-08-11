import { Request, Response } from 'express';
import { BasePage } from '../core/base-page';

export class HealthcheckPage extends BasePage {
  constructor() {
    super({ path: '/healthcheck' });
  }

  initRoutes(): void {
    this.get('/', this.index);
  }

  index(req: Request, res: Response): void {
    res.json({ uptime: process.uptime() });
  }
}

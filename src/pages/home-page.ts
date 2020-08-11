import { Request, Response } from 'express';
import { BasePage } from '../core/base-page';

export class HomePage extends BasePage {
  constructor() {
    super({ path: '/' });
  }

  initRoutes(): void {
    this.get('/', this.index);
  }

  index(req: Request, res: Response): void {
    res.render('home', {
      title: 'Home page',
    });
  }
}

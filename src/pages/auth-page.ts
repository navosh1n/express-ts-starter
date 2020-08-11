import { Request, Response } from 'express';
import { BasePage } from '../core/base-page';

export class AuthPage extends BasePage {
  constructor() {
    super({ path: '/auth' });
  }

  initRoutes(): void {
    this.get('/', this.index);
    this.get('/sign-in', this.signIn);
    this.get('/sign-out', this.signOut);
  }

  index(req: Request, res: Response): void {
    res.redirect('/auth/sign-in');
  }

  signIn(req: Request, res: Response): void {
    res.render('auth/sign-in', {
      title: 'SignIn page',
      signInApi: '/api/v1/auth/sign-in',
    });
  }

  signOut(req: Request, res: Response): void {
    req.logout();
    res.redirect('/');
  }
}

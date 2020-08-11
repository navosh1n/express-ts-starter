import { BaseController } from '../core/base-controller';
import authService from '../services/auth-service';

export class AuthController extends BaseController {
  constructor() {
    super({ path: '/v1/auth' });
  }

  initRoutes(): void {
    this.post('/sign-in', authService.signIn);
  }
}

import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../core/base-controller';
import { IUser } from '../interfaces/user-interfaces';
import userModel from '../models/user-model';
import { authMiddleware } from '../middlewares/auth-middleware';
import { NotFoundError } from '../errors';
import validate from '../utils/validate';

export class UsersController extends BaseController {
  constructor() {
    super({ path: '/v1/users' });
  }

  initRoutes(): void {
    this.get('/', this.getUsers.bind(this));
    this.get('/:id', this.getUser.bind(this));
    this.post('/', authMiddleware, this.createUser.bind(this));
    this.put('/:id', authMiddleware, this.updateUser.bind(this));
    this.delete('/:id', this.deleteUser.bind(this));
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    const users = await userModel.getUsers();
    res.json(users.map((user) => this.userDto(user)));
  }

  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = await userModel.getUserById(req.params.id);
    user
      ? res.json(this.userDto(user))
      : next(new NotFoundError());
  }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.validateUser(req.body);

      const user = await userModel.createUser(req.body);
      res.json(this.userDto(user));
    } catch (e) {
      next(e);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.validateUser(req.body);

      const user = await userModel.updateUser(req.params.id, req.body);
      res.json(this.userDto(user));
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const user = await userModel.deleteUser(req.params.id);
    res.json(this.userDto(user));
  }

  private userDto(user: IUser): Record<string, any> {
    const result = { ...user };
    delete result.password;
    return result;
  }

  private validateUser(data: Record<string, any>): boolean {
    return validate(data, {
      login: { length: { minimum: 3 } },
      password: { length: { minimum: 6 } },
    });
  }
}

import {
  getUser,
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} from '../mocks/users-mock';
import { IUser } from '../interfaces/user-interfaces';

export class UserModel {
  getUsers(): Promise<IUser[]> {
    return getUsers();
  }

  getUser(params: Record<string, any>): Promise<IUser> {
    return getUser(params);
  }

  getUserById(id: string): Promise<IUser> {
    return getUserById(id);
  }

  createUser(user: IUser): Promise<IUser> {
    return createUser(user);
  }

  updateUser(id: string, data: Record<string, any>): Promise<IUser> {
    return updateUser(id, data);
  }

  deleteUser(id: string): Promise<IUser> {
    return deleteUser(id);
  }

  validatePassword(user: IUser, password: string): boolean {
    return user.password === password;
  }
}

export default new UserModel();

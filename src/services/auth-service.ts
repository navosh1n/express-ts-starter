import passport from 'passport';
import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';
import userModel from '../models/user-model';
import config from '../config';
import { IUser } from '../interfaces/user-interfaces';

export class AuthService {
  constructor() {
    passport.serializeUser(this.serializeUser);

    passport.deserializeUser(this.deserializeUser);

    passport.use(this.localStrategy());
  }

  private serializeUser = (user: IUser, done: TDone) => {
    done(null, user.id);
  };

  private deserializeUser = async (id: string, done: TDone) => {
    try {
      const user = await userModel.getUserById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  };

  private localStrategy = () => new LocalStrategy(
    { usernameField: 'login' },
    async (login: string, password: string, done: any) => {
      try {
        const user = await userModel.getUser({ login });
        !user || !userModel.validatePassword(user, password)
          ? done(null, false, { message: 'Incorrect username or password.' })
          : done(null, user);
      } catch (err) {
        done(err);
      }
    },
  );

  signIn = passport.authenticate(
    'local',
    { successRedirect: '/', failureRedirect: config.pages.signIn },
  );
}

export default new AuthService();

type TDone = (error: any, user?: any, options?: IVerifyOptions) => void;

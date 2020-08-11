import { HttpError } from './http-error';

export class BadRequestError extends HttpError {
  constructor(public errors: TBadRequestErrors, message = 'Bad Request') {
    super(404, message);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      errors: this.errors,
    };
  }
}

type TBadRequestErrors = Record<string, string[]>;

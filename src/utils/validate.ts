import validate from 'validate.js';
import { BadRequestError } from '../errors';

export default (data: TValidateData = {}, schema: TValidateSchema = {}): boolean => {
  const errors = validate(data, schema);

  if (errors) {
    throw new BadRequestError(errors);
  }

  return true;
};

export type TValidateSchema = Record<string, any>;

export type TValidateData = Record<string, any>;

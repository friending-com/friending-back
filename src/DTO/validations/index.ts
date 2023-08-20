import { validate } from 'class-validator';
import ErrorStatus from '../../utils/ErrorStatus';

export const validation = async (obj) => {
  const error = await validate(obj);
  if (error.length) {
    throw new ErrorStatus('validation failed', 400);
  }
};

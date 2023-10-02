import { validate } from 'class-validator';
import ErrorStatus from '../../utils/ErrorStatus';

export const validation = async (obj) => {
  const error = await validate(obj);
  if (error.length) {
    throw new ErrorStatus(`Validation failed: ${error}`, 400);
  }
};

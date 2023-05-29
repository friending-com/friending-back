import { Request } from 'express';
import { SignUpData } from '../../types/profileData';
import { SignUpDTO } from '../signUpDTO';
import { validate } from 'class-validator';
import ErrorStatus from '../../utils/ErrorStatus';

export const signUpValidation = async (req: Request) => {
  const signup = new SignUpDTO();
  signup.name = req.body.name;
  signup.age = req.body.age;
  const errors = await validate(signup);
  if (errors.length) {
    throw new ErrorStatus('validation failed', 400);
  }
  const signUpData: SignUpData = {
    name: req.body.name,
    age: req.body.age,
  };
  return signUpData;
};

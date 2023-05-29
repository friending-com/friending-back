import { Request } from 'express';
import { SignUpData } from '../../types/profileData';
import { SignUpDTO } from '../signUpDTO';
import { validation } from '.';
import ErrorStatus from '../../utils/ErrorStatus';

export const signUpValidation = async (req: Request) => {
  const signup = new SignUpDTO();
  signup.name = req.body.name;
  signup.age = req.body.age;
  await validation(signup);
  const signUpData: SignUpData = {
    name: req.body.name,
    age: req.body.age,
  };
  return signUpData;
};

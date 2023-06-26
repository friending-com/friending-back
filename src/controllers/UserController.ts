import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { signUpValidation } from '../DTO/validations/signup';

export class UserController {
  static async signup(req: Request, res: Response) {
    const signUpData = await signUpValidation(req);
    await UserService.signup(signUpData);
    res.json('성공!');
  }
}

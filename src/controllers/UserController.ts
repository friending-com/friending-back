import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { SignUpData } from '../types/profileData';
import UserDAO from '../DAO/UserDAO';
import ProfileDAO from '../DAO/ProfileDAO';
import ProfileService from '../services/ProfileService';

export class UserController {
  static async signup(req: Request, res: Response) {
    const signUpData: SignUpData = {
      name: req.body.name,
      age: req.body.age,
    };
    await UserService.signup(signUpData);
    res.json('성공!');
  }
}

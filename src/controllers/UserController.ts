import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { SignUpData } from '../types/profileData';
import UserDAO from '../DAO/UserDAO';

export class UserController {
  static async signup(req: Request, res: Response) {
    const signUpData: SignUpData = {
      name: req.body.name,
      age: req.body.age,
    };
    await UserService.signup(signUpData);
    res.json('성공!');
  }
  static async get(req: Request, res: Response) {
    const userId = req.query.id as unknown as number;
    const user = await UserDAO.getUserProfiles(userId);
    const mainProfile = user.profiles.find((profile) => profile.isMain);
    res.json({ name: user.name, age: user.age, ...mainProfile });
  }
}

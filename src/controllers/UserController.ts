import { Request, Response } from 'express';
import UserDAO from '../DAO/UserDAO';
import { findProfile } from '../services/profile/findProfile';
import { SignUpData } from '../types/signUpData';

export class UserController {
  static async signup(req: Request, res: Response) {
    const signUpData: SignUpData = {
      name: req.body.name,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      phone: req.body.phone,
      facebook: req.body.facebook,
      kakaoTalk: req.body.kakaoTalk,
      age: req.body.age,
      discord: req.body.discord,
      line: req.body.line,
      naverBlog: req.body.naverBlog,
      naverBand: req.body.naverBand,
      telegram: req.body.telegram,
    };
    UserDAO.signup(signUpData);
    res.json('성공!');
  }

  static async profile(req: Request, res: Response) {
    const id = req.query.id as unknown as number;
    const result = await findProfile(id);
    res.json(result);
  }
}

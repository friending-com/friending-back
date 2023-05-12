import { Request, Response } from 'express';
import UserDAO from '../DAO/UserDAO';
import { findProfile } from '../services/profile/findProfile';

export class UserController {
  static async signup(req: Request, res: Response) {
    const {
      name,
      instagram,
      twitter,
      phone,
      facebook,
      kakaoTalk,
      age,
      discord,
      line,
      naverBlog,
      naverBand,
      telegram,
    } = req.body;
    UserDAO.signup(
      name,
      instagram,
      twitter,
      phone,
      facebook,
      kakaoTalk,
      age,
      discord,
      line,
      naverBlog,
      naverBand,
      telegram
    );
    res.json('성공!');
  }

  static async profile(req: Request, res: Response) {
    const id = req.query.id as unknown as number;
    const result = await findProfile(id);
    res.json(result);
  }
}

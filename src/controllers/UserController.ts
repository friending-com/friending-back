import { Request, Response } from 'express';
import UserDAO from '../DAO/UserDAO';
import { findProfile } from '../services/profile/findProfile';
import { SignUpData, UpdateData } from '../types/signUpData';
import ErrorStatus from '../utils/ErrorStatus';

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

  static async updateProfile(req: Request, res: Response) {
    const updateData: UpdateData = {
      id: req.body.id,
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
    const result = await UserDAO.getProfile(updateData.id);
    if (result) {
      await UserDAO.update(updateData);
      res.json('업데이트 완료!');
    } else {
      throw new ErrorStatus('user가 존재하지 않습니다.', 400);
    }
  }
}

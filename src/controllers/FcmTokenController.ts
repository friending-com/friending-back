import { Request, Response } from 'express';
import { JWTService } from '../services/JWTService';
import { UserService } from '../services/UserService';

export class FcmToken {
  static async register(req: Request, res: Response) {
    const { id } = await JWTService.verify(req.headers.authorization);
    const { token } = req.body;
    await UserService.registerfcmToken(id, token);
    res.json('토큰 등록 완료');
  }
}

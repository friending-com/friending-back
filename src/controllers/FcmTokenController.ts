import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { fcmTokenValidation } from '../DTO/validations/fcmToken';

export class FcmToken {
  static async register(req: Request, res: Response) {
    const fcmTokenDTO = await fcmTokenValidation(req);
    await UserService.registerfcmToken(fcmTokenDTO);
    res.json('토큰 등록 완료');
  }
}

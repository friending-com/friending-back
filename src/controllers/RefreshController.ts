import { Request, Response } from 'express';
import { JWTService } from '../services/JWTService';

export class RefreshController {
  static async post(req: Request, res: Response) {
    const refresh = req.body.refreshToken;
    const access = req.headers.authorization;
    const tokens = await JWTService.refreshCheck(access, refresh);
    res.json(tokens);
  }
}

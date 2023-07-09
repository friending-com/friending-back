import { Request, Response } from 'express';
import { CallbackService } from '../services/CallbackService';
import { LoginService } from '../services/LoginService';
export class CallbackController {
  static async post(req: Request, res: Response) {
    const { accessToken } = req.body;
    const data = await CallbackService.google(accessToken);
    const tokens = await LoginService.googleLogin(data);
    res.json(tokens);
  }
}

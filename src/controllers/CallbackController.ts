import { Request, Response } from 'express';
import { CallbackService } from '../services/CallbackService';

export class CallbackController {
  static async post(req: Request, res: Response) {
    const accessToken = req.body.code;
    const data = await CallbackService.google(accessToken);
    res.json(data);
  }
}

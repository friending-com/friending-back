import { Request, Response } from 'express';
import { CallbackService } from '../services/CallbackService';

export class CallbackController {
  static async post(req: Request, res: Response) {
    const code = req.body.code;
    await CallbackService.googlePost(code);
    res.json('응답~');
  }
}

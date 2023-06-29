import { Request, Response } from 'express';
import { NavigateService } from '../services/NavigateService';
import { token } from '../utils/auth';

export class NavigateController {
  static post(req: Request, res: Response) {
    const findProfile = req.body as unknown as number;
    const userProfile = token(req.headers.authorization);
    NavigateService.navigate(userProfile, findProfile);
  }
}

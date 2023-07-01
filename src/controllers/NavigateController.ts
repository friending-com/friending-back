import { Request, Response } from 'express';
import { NavigateService } from '../services/NavigateService';
import { token } from '../utils/auth';
import { UserService } from '../services/UserService';
import ErrorStatus from '../utils/ErrorStatus';

export class NavigateController {
  static async post(req: Request, res: Response) {
    const findProfile = req.body.findProfile as unknown as number;
    const userProfile = token(req.headers.authorization);
    const result = await NavigateService.navigate(userProfile, findProfile);
    if (result) res.json(result);
    else res.json('navigate 결과가 없습니다');
  }
}

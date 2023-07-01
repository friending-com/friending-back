import { Request, Response } from 'express';
import { NavigateService } from '../services/NavigateService';
import { token } from '../utils/auth';
import { UserService } from '../services/UserService';
import ErrorStatus from '../utils/ErrorStatus';
import { AuthorizationService } from '../services/AuthorizationService';

export class NavigateController {
  static async post(req: Request, res: Response) {
    const findProfile = req.body.findProfile as unknown as number;
    const userProfile = req.body.userProfile as unknown as number;
    const user = token(req.headers.authorization);
    const authResult = await AuthorizationService.doesUserHaveProfile(
      user,
      userProfile
    );
    if (!authResult)
      throw new ErrorStatus('프로필의 소유 권한이 없습니다!', 400);
    const result = await NavigateService.navigate(userProfile, findProfile);
    if (result) res.json(result);
    else res.json('navigate 결과가 없습니다');
  }
}

import { Request, Response } from 'express';
import { ProfileCreateData, UpdateData } from '../types/profileData';
import ProfileService from '../services/ProfileService';
import ErrorStatus from '../utils/ErrorStatus';
import { createProfileValidation } from '../DTO/validations/profile';

export class ProfileController {
  static async get(req: Request, res: Response) {
    const userId = req.query.id as unknown as number;
    const mainProfile = await ProfileService.getMainProfile(userId);
    res.json(mainProfile);
  }

  static async post(req: Request, res: Response) {
    const profileData = await createProfileValidation(req);
    const profile = await ProfileService.createProfile(profileData);
    if (profileData.isMain) {
      await ProfileService.setMainProfile(profileData.userId, profile.id);
    }
    res.json('성공');
  }

  static async patch(req: Request, res: Response) {
    const userId = req.body.userId;
    const isMain = req.body.isMain;
    const profileData: UpdateData = {
      id: req.body.id,
      discord: req.body.discord,
      line: req.body.line,
      naverBlog: req.body.naverBlog,
      naverBand: req.body.naverBand,
      telegram: req.body.telegram,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      phone: req.body.phone,
      facebook: req.body.facebook,
      kakaoTalk: req.body.kakaoTalk,
    };
    if (!profileData.id) {
      throw new ErrorStatus('변경할 프로필에 대한 정보가 필요합니다!', 400);
    }
    await ProfileService.modifyProfile(profileData);

    if (isMain === true && userId) {
      await ProfileService.setMainProfile(userId, profileData.id);
    }
    res.json('성공!');
  }
}

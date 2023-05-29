import { Request, Response } from 'express';
import { ProfileCreateData, UpdateData } from '../types/profileData';
import ProfileService from '../services/ProfileService';
import ErrorStatus from '../utils/ErrorStatus';

export class ProfileController {
  static async get(req: Request, res: Response) {
    const userId = req.query.id as unknown as number;
    try {
      const mainProfile = await ProfileService.getMainProfile(userId);
      res.json(mainProfile);
    } catch (err) {
      throw new ErrorStatus('유저가 존재하지 않습니다.', 400);
    }
  }

  static async post(req: Request, res: Response) {
    const userId = req.body.userId;
    const isMain = req.body.isMain;
    const profileData: ProfileCreateData = {
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
      isPublic: isMain ? true : req.body.isPublic,
    };
    const profile = await ProfileService.createProfile(userId, profileData);
    if (isMain) {
      await ProfileService.setMainProfile(userId, profile.id);
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

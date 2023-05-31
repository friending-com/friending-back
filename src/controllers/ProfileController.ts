import { Request, Response } from 'express';
import ProfileService from '../services/ProfileService';
import ErrorStatus from '../utils/ErrorStatus';
import { createProfileValidation } from '../DTO/validations/profile';
import { token } from '../utils/auth';
import { UpdateData } from '../types/profileData';
import UserDAO from '../DAO/UserDAO';

export class ProfileController {
  static async get(req: Request, res: Response) {
    const userId = token(req.headers.authorization);
    const findProfileId = req.params.id as unknown as number;
    const profileResult = await ProfileService.getProfile(
      userId,
      findProfileId
    );
    res.json(profileResult);
  }

  static async getAll(req: Request, res: Response) {
    const userId = token(req.headers.authorization);
    const profiles = await UserDAO.getUser(userId);
    res.json(profiles);
  }

  static async post(req: Request, res: Response) {
    const profileData = await createProfileValidation(req);
    await ProfileService.createProfile(profileData);
    res.json('성공');
  }

  static async patch(req: Request, res: Response) {
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
    res.json('성공!');
  }
}

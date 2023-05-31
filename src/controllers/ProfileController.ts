import { Request, Response } from 'express';
import ProfileService from '../services/ProfileService';
import ErrorStatus from '../utils/ErrorStatus';
import {
  createProfileValidation,
  modifyProfileValidation,
} from '../DTO/validations/profile';
import { token } from '../utils/auth';
import { UpdateData } from '../types/profileData';
import UserDAO from '../DAO/UserDAO';
import { UserService } from '../services/UserService';

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
    const profiles = await UserService.findAllProfile(userId);
    res.json(profiles);
  }

  static async post(req: Request, res: Response) {
    const profileData = await createProfileValidation(req);
    await ProfileService.createProfile(profileData);
    res.json('성공');
  }

  static async patch(req: Request, res: Response) {
    const profileData = await modifyProfileValidation(req);
    await ProfileService.modifyProfile(profileData);
    res.json('성공!');
  }
}

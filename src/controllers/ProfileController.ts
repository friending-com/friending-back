import { Request, Response } from 'express';
import ProfileService from '../services/ProfileService';
import {
  createProfileValidation,
  deleteProfileValidation,
  getAllProfileValidation,
  getProfileValidation,
  modifyProfileValidation,
} from '../DTO/validations/profile';
import { UserService } from '../services/UserService';

export class ProfileController {
  static async get(req: Request, res: Response) {
    const id = await getProfileValidation(req);
    const profileResult = await ProfileService.getProfile(id);
    res.json(profileResult);
  }

  static async getAll(req: Request, res: Response) {
    const userId = await getAllProfileValidation(req);
    const profiles = await UserService.findAllProfile(userId);
    res.json(profiles);
  } // /friends 에 대한 GET

  static async post(req: Request, res: Response) {
    const profileData = await createProfileValidation(req);
    await ProfileService.createProfile(profileData);
    res.json('성공');
  }

  static async patch(req: Request, res: Response) {
    const profileData = await modifyProfileValidation(req);
    const profileResult = await ProfileService.modifyProfile(profileData);
    res.json(profileResult);
  }

  static async delete(req: Request, res: Response) {
    const profileId = await deleteProfileValidation(req);
    await ProfileService.deleteProfile(profileId);
    res.json('삭제완료');
  }
}

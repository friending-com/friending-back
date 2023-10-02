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
    const dto = await getProfileValidation(req);
    const profileResult = await ProfileService.getProfile(dto);
    res.json(profileResult);
  }

  static async getAll(req: Request, res: Response) {
    const dto = await getAllProfileValidation(req);
    const profiles = await UserService.findAllProfile(dto.userId);
    res.json(profiles);
  } // /friends 에 대한 GET

  static async post(req: Request, res: Response) {
    const dto = await createProfileValidation(req);
    await ProfileService.createProfile(dto);
    res.json('성공');
  }

  static async patch(req: Request, res: Response) {
    const dto = await modifyProfileValidation(req);
    const profileResult = await ProfileService.modifyProfile(dto);
    res.json(profileResult);
  }

  static async delete(req: Request, res: Response) {
    const dto = await deleteProfileValidation(req);
    await ProfileService.deleteProfile(dto);
    res.json('삭제완료');
  }
}

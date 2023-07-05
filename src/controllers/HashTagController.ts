import { Request, Response } from 'express';
import { HashTagService } from '../services/hashTagService';
import {
  hashTagDeleteValidation,
  hashTagGetValidation,
  hashTagPostValidation,
} from '../DTO/validations/hashTag';
import { AuthorizationService } from '../services/AuthorizationService';
import ErrorStatus from '../utils/ErrorStatus';

export class HashTagController {
  static async post(req: Request, res: Response) {
    const { hashTagName, profileId, userId } = await hashTagPostValidation(req);
    const result = await AuthorizationService.doesUserHaveProfile(
      userId,
      profileId
    );
    if (!result) {
      throw new ErrorStatus('권한이 없습니다!', 400);
    }
    await HashTagService.add(hashTagName, profileId);
    res.json('hashTag 등록 완료');
  }

  static async get(req: Request, res: Response) {
    const hashTagName = await hashTagGetValidation(req);
    const result = await HashTagService.search(hashTagName);
    res.json(result);
  }

  static async delete(req: Request, res: Response) {
    const { hashTagName, profileId, userId } = await hashTagDeleteValidation(
      req
    );
    const result = await AuthorizationService.doesUserHaveProfile(
      userId,
      profileId
    );
    if (!result) {
      throw new ErrorStatus('권한이 없습니다!', 400);
    }
    await HashTagService.delete(hashTagName, profileId);
    res.json('hashTag가 삭제되었습니다');
  }
}

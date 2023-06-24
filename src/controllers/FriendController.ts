import { Request, Response } from 'express';
import { FriendService } from '../services/FriendService';
import ErrorStatus from '../utils/ErrorStatus';
import FriendDAO from '../DAO/FriendDAO';
import { token } from '../utils/auth';
import { FriendAddDTO } from '../DTO/FriendDTO';
import {
  friendGetAllValidation,
  friendAddValidation,
} from '../DTO/validations/friend';

export class FriendController {
  static async post(req: Request, res: Response) {
    const { userProfileId, subProfileId } = await friendAddValidation(req);
    await FriendService.add(userProfileId, subProfileId);
    res.json('등록 완료!');
  }

  static async getAll(req: Request, res: Response) {
    const userProfileId = await friendGetAllValidation(req);
    const result = await FriendService.getFriendProfiles(userProfileId);
    res.json(result);
  }
  static async get(req: Request, res: Response) {
    const userId = req.query.id as unknown as number;
    const result = await FriendService.show(userId);
    res.json(result);
  }

  static async delete(req: Request, res: Response) {
    const userId = req.query.userId as unknown as number;
    const subId = req.query.subId as unknown as number;
    if (userId && subId) {
      await FriendService.delete(userId, subId);
      res.json('친구 삭제를 완료하였습니다');
    } else {
      throw new ErrorStatus('user가 존재하지 않습니다!', 400);
    }
  }
}

import { Request, Response } from 'express';
import { FriendService } from '../services/FriendService';
import ErrorStatus from '../utils/ErrorStatus';
import FriendDAO from '../DAO/FriendDAO';
import { token } from '../utils/auth';
import { FriendAddDTO } from '../DTO/FriendDTO';
import {
  friendGetAllValidation,
  friendAddValidation,
  friendGetValidation,
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
  } //user의 모든 프로필에 대한 모든 친구를 가져옴
  static async get(req: Request, res: Response) {
    const profileId = await friendGetValidation(req);
    const result = await FriendService.show(profileId);
    res.json(result);
  } //한가지 프로필에 대한 친구목록을 가져옴

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

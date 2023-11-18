import { Request, Response } from 'express';
import { FriendService } from '../services/FriendService';
import {
  friendGetAllValidation,
  friendAddValidation,
  friendGetValidation,
  firendDeleteValidation,
} from '../DTO/validations/friend';
import { AuthorizationService } from '../services/AuthorizationService';
import ErrorStatus from '../utils/ErrorStatus';

export class FriendController {
  static async post(req: Request, res: Response) {
    const friendAddDTO = await friendAddValidation(req);
    const result = await AuthorizationService.doesUserHaveProfile(
      friendAddDTO.userId,
      friendAddDTO.userProfileId
    );
    if (!result) {
      throw new ErrorStatus('권한이 없습니다!', 400);
    }
    await FriendService.add(friendAddDTO);
    res.json('등록 완료!');
  }

  static async getAll(req: Request, res: Response) {
    const friendGetAllDTO = await friendGetAllValidation(req);
    const result = await FriendService.getFriendProfiles(friendGetAllDTO);
    res.json(result);
  } //user의 모든 프로필에 대한 모든 친구를 가져옴

  static async get(req: Request, res: Response) {
    const friendGetDTO = await friendGetValidation(req);
    const result = await FriendService.show(friendGetDTO);
    res.json(result);
  } //한가지 프로필에 대한 친구목록을 가져옴

  static async delete(req: Request, res: Response) {
    const friendDeleteDTO = await firendDeleteValidation(req);
    const result = await AuthorizationService.doesUserHaveProfile(
      friendDeleteDTO.userId,
      friendDeleteDTO.userProfileId
    );
    if (!result) {
      throw new ErrorStatus('권한이 없습니다!', 400);
    }
    await FriendService.delete(friendDeleteDTO);
    res.json('친구 삭제를 완료하였습니다');
  }
}

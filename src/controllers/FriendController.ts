import { Request, Response } from 'express';
import { addFriend } from '../services/friend/addFreind';
import { showFriend } from '../services/friend/showFriend';

export class FriendController {
  static async post(req: Request, res: Response) {
    const { userId, subId } = req.body;
    const result = await addFriend(userId, subId);
    if (result) res.json('등록 완료!');
    else {
      throw new Error('추가하려는 user가 존재하지 않습니다.');
    }
  }

  static async get(req: Request, res: Response) {
    const userId = req.query.id as unknown as number;
    const result = await showFriend(userId);
    res.json(result);
  }
}

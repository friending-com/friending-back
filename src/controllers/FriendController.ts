import { Request, Response } from 'express';
import { addFriend } from '../services/friend/addFreind';
import { showFriend } from '../services/friend/showFriend';

export class FriendController {
  static async post(req: Request, res: Response) {
    const { userId, subId } = req.body;
    await addFriend(userId, subId);
    res.json('등록 완료!');
  }

  static async get(req: Request, res: Response) {
    const userId = req.query.id as unknown as number;
    const result = await showFriend(userId);
    res.json(result);
  }
}

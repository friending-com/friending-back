import { Request, Response } from 'express';
import { FriendService } from '../services/FriendService';

export class FriendController {
  static async post(req: Request, res: Response) {
    const { userId, subId } = req.body;
    await FriendService.add(userId, subId);
    res.json('등록 완료!');
  }

  static async get(req: Request, res: Response) {
    const userId = req.query.id as unknown as number;
    const result = await FriendService.show(userId);
    res.json(result);
  }

  static async delete(req: Request, res: Response) {
    const userId = req.query.userId as unknown as number;
    const subId = req.query.subId as unknown as number;
    await FriendService.delete(userId, subId);
    res.json('친구 삭제를 완료하였습니다');
  }
}

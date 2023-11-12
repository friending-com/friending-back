import { Request, Response } from 'express';
import { JWTService } from '../services/JWTService';
import { FCMService } from '../services/FCMService';
import ProfileService from '../services/ProfileService';

export class FriendRequestController {
  static async post(req: Request, res: Response) {
    const { senderProfileId, requestedProfileId } = req.body;
    await JWTService.verify(req.headers.authorization);
    const id = await ProfileService.getUser(requestedProfileId);
    await FCMService.requestFriend(id, senderProfileId);
    res.json('전송완료');
  }
}

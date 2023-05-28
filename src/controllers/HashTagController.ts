import { Request, Response } from 'express';
import { HashTagService } from '../services/hashTagService';

export class HashTagController {
  static async post(req: Request, res: Response) {
    const { hashTagName, profileId } = req.body;
    await HashTagService.add(hashTagName, profileId);
    res.json('hashTag 등록 완료');
  }

  static async get(req: Request, res: Response) {
    const hashTagName = req.query.hashTagName as unknown as string;
    const result = await HashTagService.search(hashTagName);
    res.json(result);
  }

  static async delete(req: Request, res: Response) {
    const hashTagName = req.query.hashTagName as unknown as string;
    const userId = req.query.userId as unknown as number;
    await HashTagService.delete(hashTagName, userId);
    res.json('hashTag가 삭제되었습니다');
  }
}

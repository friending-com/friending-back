import { Request, Response } from 'express';
import {
  hashTagAddService,
  hashTagSearchService,
} from '../services/hashTag/hashTagService';

export class HashTagController {
  static async post(req: Request, res: Response) {
    const { hashTagName, userId } = req.body;
    await hashTagAddService(hashTagName, userId);
    res.json('hashTag 등록 완료');
  }

  static async get(req: Request, res: Response) {
    const hashTagName = req.query.hashTagName as unknown as string;
    const result = await hashTagSearchService(hashTagName);
    res.json(result);
  }

  static async delete(req: Request, res: Response) {
    const { hashTagName, userId } = req.body;
  }
}

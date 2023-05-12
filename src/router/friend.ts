import express, { Express, NextFunction, Request, Response } from 'express';
import { addFriend } from '../Service/friend/addFreind';
import { showFriend } from '../Service/friend/showFriend';
import errorHandler from './ErrorHandler';

const router = express.Router();
router.post(
  '/',
  errorHandler(async (req: Request, res: Response) => {
    const { userId, subId } = req.body;
    const result = await addFriend(userId, subId);
    if (result) res.json('등록 완료!');
    else {
      throw new Error('추가하려는 user가 존재하지 않습니다.');
    }
  })
);

router.get(
  '/',
  errorHandler(async (req: Request, res: Response) => {
    const userId = req.query.id as unknown as number;
    const result = await showFriend(userId);
    res.json(result);
  })
);
export { router as friend };

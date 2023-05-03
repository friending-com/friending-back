import express, { Express, Request, Response } from 'express';
import { addFriend } from '../DAO/addFriend';
import getProfile from '../DAO/profile';

const router = express.Router();
router.post('/', async (req: Request, res: Response) => {
  const { userId, subId } = req.body;
  const user = await getProfile(userId);
  const subUser = await getProfile(subId);
  if (user && subUser) {
    addFriend(userId, subId);
    res.json('등록 완료!');
  } else {
    res.json('user가 존재하지 않습니다.');
  }
});
export { router as friend };

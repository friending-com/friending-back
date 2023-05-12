import express, { Express, Request, Response } from 'express';
import FriendDAO from '../DAO/FriendDAO';
import UserDAO from '../DAO/UserDAO';

const router = express.Router();
router.post('/', async (req: Request, res: Response) => {
  const { userId, subId } = req.body;
  const user = await UserDAO.getProfile(userId);
  const subUser = await UserDAO.getProfile(subId);
  if (user && subUser) {
    FriendDAO.addFriend(userId, subId);
    res.json('등록 완료!');
  } else {
    res.json('user가 존재하지 않습니다.');
  }
});

router.get('/', async (req: Request, res: Response) => {
  const userId = req.query.id as unknown as number;
  const user = await UserDAO.getProfile(userId);
  if (!user) {
    res.json('user가 존재하지 않습니다.');
    return;
  }
  const friendList = await FriendDAO.getFriendList(userId);
  const result = await Promise.all(
    friendList.map(async (friend) => await UserDAO.getProfile(friend))
  );
  res.json(result);
});
export { router as friend };

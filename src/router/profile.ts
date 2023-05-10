import express, { Express, Request, Response } from 'express';
import getProfile from '../DAO/user/getProfile';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const id = req.query.id as unknown as number;
    if (!id) {
      throw new Error('query없음');
    }
    const user = await getProfile(id);
    if (user === null) {
      res.json('user가 존재하지 않습니다.');
      return;
    }
    res.json(user);
  } catch (err) {
    res.json('오류가 발생했습니다.');
  }
});
export { router as profile };

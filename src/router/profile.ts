import express, { Express, Request, Response } from 'express';
import { findProfile } from '../Service/profile/findProfile';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const id = req.query.id as unknown as number;
    const result = await findProfile(id);
    res.json(result);
  } catch (err) {
    res.json('오류가 발생했습니다.');
  }
});
export { router as profile };

import express, { Express, Request, Response } from 'express';
import { hashTagService } from '../Service/hashTagService';
const router = express.Router();
router.post('/', async (req: Request, res: Response) => {
  const { hashTagName, userId } = req.body;
  await hashTagService(hashTagName, userId);
  res.json('hashTag 등록 완료');
});
export { router as hashTag };

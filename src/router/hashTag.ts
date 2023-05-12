import express, { Express, Request, Response } from 'express';
import {
  hashTagAddService,
  hashTagSearchService,
} from '../services/hashTag/hashTagService';
import errorHandler from './ErrorHandler';
const router = express.Router();
router.post(
  '/',
  errorHandler(async (req: Request, res: Response) => {
    const { hashTagName, userId } = req.body;
    await hashTagAddService(hashTagName, userId);
    res.json('hashTag 등록 완료');
  })
);

router.get(
  '/',
  errorHandler(async (req: Request, res: Response) => {
    const hashTagName = req.query.hashTagName as unknown as string;
    const result = await hashTagSearchService(hashTagName);
    res.json(result);
  })
);

router.delete(
  '/',
  errorHandler(async (req: Request, res: Response) => {
    const { hashTagName, userId } = req.body;
  })
);
export { router as hashTag };

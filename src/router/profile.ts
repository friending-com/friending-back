import express, { Express, NextFunction, Request, Response } from 'express';
import { findProfile } from '../Service/profile/findProfile';
import errorHandler from './ErrorHandler';
const router = express.Router();

router.get(
  '/',
  errorHandler(async (req: Request, res: Response) => {
    const id = req.query.id as unknown as number;
    const result = await findProfile(id);
    res.json(result);
  })
);
export { router as profile };

import express, { Express, Request, Response } from 'express';
import signup from '../DAO/signup';
const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { name, instagram, twitter, phone, facebook, kakaoTalk, age } =
    req.body;
  signup(name, instagram, twitter, phone, facebook, kakaoTalk, age);
  res.json('성공!');
});

export { router as signup };

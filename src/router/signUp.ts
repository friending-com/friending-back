import express, { Express, Request, Response } from 'express';
import signupExecute from '../DAO/signup';
const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { name, instagram, twitter, phone, facebook, kakaoTalk, age } =
    req.body;
  signupExecute(name, instagram, twitter, phone, facebook, kakaoTalk, age);
});

export { router as signup };

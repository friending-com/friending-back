import express, { Express, Request, Response } from 'express';
import UserDAO from '../DAO/UserDAO';
import errorHandler from './ErrorHandler';
const router = express.Router();

router.post(
  '/',
  errorHandler((req: Request, res: Response) => {
    const {
      name,
      instagram,
      twitter,
      phone,
      facebook,
      kakaoTalk,
      age,
      discord,
      line,
      naverBlog,
      naverBand,
      telegram,
    } = req.body;
    UserDAO.signup(
      name,
      instagram,
      twitter,
      phone,
      facebook,
      kakaoTalk,
      age,
      discord,
      line,
      naverBlog,
      naverBand,
      telegram
    );
    res.json('성공!');
  })
);

export { router as signup };

import express, { Express, Request, Response } from 'express';
import startDB from './DAO/signup';
import dotenv from 'dotenv';
import { signup } from './router/signUp';
import { profile } from './router/profile';
dotenv.config();

const app: Express = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/signup', signup);
app.use('/profile', profile);
app.get('/', (req: Request, res: Response) => {
  res.send('Server Setting');
});
app.listen(port, () => {
  console.log('서버 ON');
});

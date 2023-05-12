import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { signup } from './router/signUp';
import { profile } from './router/profile';
import { AppDataSource } from './DAO/data-source';
import { friend } from './router/friend';
import { hashTag } from './router/hashTag';
dotenv.config();

const app: Express = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
AppDataSource.initialize()
  .then(async () => {})
  .catch((err) => console.log(err));
app.use('/signup', signup);
app.use('/profile', profile);
app.use('/friend', friend);
app.use('/hashtag', hashTag);
app.get('/', (req: Request, res: Response) => {
  res.send('Server Setting');
});
app.listen(port, () => {
  console.log('서버 ON');
});

export default app;

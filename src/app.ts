import express, { Express, Request, Response } from 'express';
import startDB from './index';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = 8080;
startDB();
app.get('/', (req: Request, res: Response) => {
  res.send('Server Setting');
});
app.listen(port, () => {
  console.log('서버 ON');
});

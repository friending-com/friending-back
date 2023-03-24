import express, { Express, Request, Response } from 'express';
const app: Express = express();
const port = 8080;
app.get('/', (req: Request, res: Response) => {
  res.send('Server Setting');
});
app.listen(port, () => {
  console.log('서버 ON');
});

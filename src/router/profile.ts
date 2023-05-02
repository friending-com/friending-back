import express, { Express, Request, Response } from 'express';
import getProfile from '../DAO/profile';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const id = req.query.id as unknown as number;
  const user = await getProfile(id);
  res.json(user);
});
export { router as profile };

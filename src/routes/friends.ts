import { Router } from 'express';
import errorHandler from './errorHandler';
import { FriendController } from '../controllers/FriendController';

const router = Router();

router.get('/', errorHandler(FriendController.getAll));

export { router as friends };

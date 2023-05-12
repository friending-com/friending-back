import { Router } from 'express';
import errorHandler from './errorHandler';
import { FriendController } from '../controllers/FriendController';

const router = Router();

router.post('/', errorHandler(FriendController.post));
router.get('/', errorHandler(FriendController.get));

export { router as friend };

import { Router } from 'express';
import { addFriend } from '../services/friend/addFreind';
import { showFriend } from '../services/friend/showFriend';
import errorHandler from './errorHandler';
import { FriendController } from '../controllers/friendController';

const router = Router();
router.post('/', errorHandler(FriendController.post));
router.get('/', errorHandler(FriendController.get));

export { router as friend };

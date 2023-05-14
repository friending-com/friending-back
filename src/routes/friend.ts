import { Router } from 'express';
import errorHandler from './errorHandler';
import { FriendController } from '../controllers/FriendController';

const router = Router();

router.post('/', errorHandler(FriendController.post));
router.get('/', errorHandler(FriendController.get));
router.delete('/',errorHandler(FriendController.delete));

export { router as friend };

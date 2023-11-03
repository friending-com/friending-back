import { FriendRequestController } from '../controllers/FriendRequestConrtoller';
import errorHandler from './errorHandler';
import { Router } from 'express';

const router = Router();

router.post('/', errorHandler(FriendRequestController.post));
export { router as friending };

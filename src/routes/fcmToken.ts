import { Router } from 'express';
import { FcmToken } from '../controllers/FcmTokenController';
import errorHandler from './errorHandler';

const router = Router();

router.post('/', errorHandler(FcmToken.register));

export { router as fcmToken };

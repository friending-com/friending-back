import { Router } from 'express';
import errorHandler from './errorHandler';
import { CallbackController } from '../controllers/CallbackController';
const router = Router();

router.get('/', errorHandler(CallbackController.post));
router.post('/', errorHandler(CallbackController.post));

export { router as category };

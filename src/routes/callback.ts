import { Router } from 'express';
import errorHandler from './errorHandler';
import { CallbackController } from '../controllers/CallbackController';
const router = Router();

router.post('/', errorHandler(CallbackController.post));

export { router as callback };

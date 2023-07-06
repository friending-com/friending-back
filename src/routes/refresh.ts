import { Router } from 'express';
import errorHandler from './errorHandler';
import { RefreshController } from '../controllers/RefreshController';

const router = Router();

router.post('/', errorHandler(RefreshController.post));

export { router as refresh };

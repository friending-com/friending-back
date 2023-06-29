import { Router } from 'express';
import errorHandler from './errorHandler';
import { NavigateController } from '../controllers/NavigateController';

const router = Router();
router.post('/', errorHandler(NavigateController.post));
export { router as navigate };

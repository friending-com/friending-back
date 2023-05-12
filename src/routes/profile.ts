import errorHandler from './errorHandler';
import { UserController } from '../controllers/UserController';
import { Router } from 'express';

const router = Router();

router.get('/', errorHandler(UserController.profile));

export { router as profile };

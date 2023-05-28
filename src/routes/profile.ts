import errorHandler from './errorHandler';
import { UserController } from '../controllers/UserController';
import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController';

const router = Router();

router.get('/', errorHandler(ProfileController.get));
router.post('/', errorHandler(ProfileController.post));
router.patch('/', errorHandler(ProfileController.patch));

export { router as profile };

import errorHandler from './errorHandler';
import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController';

const router = Router();

router.get('/:id', errorHandler(ProfileController.get));
router.post('/', errorHandler(ProfileController.post));
router.patch('/:id', errorHandler(ProfileController.patch));
router.delete('/:id', errorHandler(ProfileController.delete));

export { router as profile };

import errorHandler from './errorHandler';
import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController';

const router = Router();

router.get('/', errorHandler(ProfileController.getAll));
export { router as profiles };

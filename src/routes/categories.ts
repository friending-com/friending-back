import errorHandler from './errorHandler';
import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController';
import { CategoryController } from '../controllers/CategoryController';

const router = Router();

router.get('/', errorHandler(CategoryController.getAll));
export { router as categories };

import { Router } from 'express';
import errorHandler from './errorHandler';
import { CategoryController } from '../controllers/CategoryController';
const router = Router();

router.get('/', errorHandler(CategoryController.get));
router.post('/', errorHandler(CategoryController.make));
router.delete('/', errorHandler(CategoryController.removeAll));

router.post('/friend', errorHandler(CategoryController.add));
router.delete('/friend', errorHandler(CategoryController.add));

export { router as category };

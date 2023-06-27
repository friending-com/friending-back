import { Router } from 'express';
import errorHandler from './errorHandler';
import { SearchController } from '../controllers/SearchController';

const router = Router();
router.post('/', errorHandler(SearchController.post));

export { router as search };

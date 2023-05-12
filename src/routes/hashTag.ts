import { Router } from 'express';
import errorHandler from './errorHandler';
import { HashTagController } from '../controllers/HashTagController';

const router = Router();

router.post('/', errorHandler(HashTagController.post));
router.get('/', errorHandler(HashTagController.get));
router.delete('/', errorHandler(HashTagController.delete));

export { router as hashTag };

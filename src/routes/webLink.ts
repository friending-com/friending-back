import { WebLinkController } from '../controllers/WebLinkController';
import errorHandler from './errorHandler';
import { Router } from 'express';

const router = Router();

router.get('/', errorHandler(WebLinkController.get));
router.post('/', errorHandler(WebLinkController.post));

export { router as webLink };

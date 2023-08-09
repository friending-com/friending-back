import { Router } from 'express';
import errorHandler from './errorHandler';
import { ImageController } from '../controllers/ImageController';
import { multerSetting } from '../services/ImageUploadService';
import { error } from 'console';

const router = Router();

router.post(
  '/',
  multerSetting.single('file'),
  errorHandler(ImageController.post)
);

router.delete('/', errorHandler(ImageController.delete));

export { router as image };

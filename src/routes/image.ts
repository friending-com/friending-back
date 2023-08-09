import { Router } from 'express';
import errorHandler from './errorHandler';
import { ImageController } from '../controllers/ImageController';
import { multerSetting } from '../services/ImageUploadService';

const router = Router();

router.post(
  '/',
  multerSetting.single('file'),
  errorHandler(ImageController.post)
);

export { router as image };

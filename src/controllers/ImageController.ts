import { Request, Response } from 'express';
import { ImageUploadService } from '../services/ImageUploadService';

export class ImageController {
  static async post(req: Request, res: Response) {
    const response = await ImageUploadService.upload(req);
    res.json(response);
  }
}

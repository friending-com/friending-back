import { Request, Response } from 'express';
import { ImageUploadService } from '../services/ImageUploadService';

export class ImageController {
  static async post(req: Request, res: Response) {
    const response = await ImageUploadService.upload(req);
    res.json(response);
  }

  static async delete(req: Request, res: Response) {
    const response = await ImageUploadService.delete(
      req.query.fileName as string
    );
    res.json(response);
  }
}

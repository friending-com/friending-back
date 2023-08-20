import { Request, Response } from 'express';
import { ImageUploadService } from '../../services/ImageUploadService';
import { ImageController } from '../ImageController';

describe('ImageController', () => {
  it('post', async () => {
    const req: any = {
      file: {
        originalname: 'image.png',
      },
    };
    const res: any = {
      json: jest.fn(),
    };
    jest.spyOn(ImageUploadService, 'upload').mockResolvedValue('이미지링크URL');
    await ImageController.post(req as Request, res as Response);
    expect(res.json).toHaveBeenCalledWith('이미지링크URL');
  });
});

import { Request, Response } from 'express';
import { ImageUploadService } from '../../services/ImageUploadService';
import { ImageController } from '../ImageController';
import { DeleteObjectCommandOutput } from '@aws-sdk/client-s3';

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

  it('delete', async () => {
    const req: any = {
      query: {
        fileName: 'image.png',
      },
    };

    const res: any = {
      json: jest.fn(),
    };
    jest
      .spyOn(ImageUploadService, 'delete')
      .mockResolvedValue(true as unknown as DeleteObjectCommandOutput);
    await ImageController.delete(req as Request, res as Response);
    expect(ImageUploadService.delete).toHaveBeenCalledWith('image.png');
    expect(res.json).toHaveBeenCalledWith(true);
  });
});

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Request } from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();
const s3Config = {
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
};
const storage = multer.memoryStorage();
export const multerSetting = multer({ storage: storage });
export class ImageUploadService {
  static client = new S3Client(s3Config);
  static async upload(req: Request) {
    const file = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
    };
    try {
      const response = await ImageUploadService.client.send(
        new PutObjectCommand(file)
      );
      return response;
    } catch (err) {
      console.error(err);
    }
  }
}

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Request } from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import ErrorStatus from '../utils/ErrorStatus';
dotenv.config();
const s3Config = {
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
const storage = multer.memoryStorage();
export const multerSetting = multer({ storage: storage });
export class ImageUploadService {
  static client = new S3Client(s3Config);
  static async upload(req: Request) {
    const [name, type] = getFileType(req.file.originalname);
    const currnetTime = getCurrentDateTime();
    const fileName = currnetTime + name + type;
    const file = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: req.file.buffer,
    };
    try {
      const response = await ImageUploadService.client.send(
        new PutObjectCommand(file)
      );
      return `https://friending-image-bucket.s3.ap-northeast-2.amazonaws.com/${fileName}`;
    } catch (err) {
      throw err;
    }
  }

  static async delete(fileName: string) {
    const deleteCommand = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
    };
    const command = new DeleteObjectCommand(deleteCommand);
    const result = await ImageUploadService.client.send(command);
    return result;
  }
}

const getFileType = (file: string) => {
  if (!file.match(/.png|.jpeg|.jpg/)) {
    throw new ErrorStatus(
      'jpeg, jpg, png형식의 파일만 업로드 가능합니다.',
      400
    );
  }
  let type: string = '';
  if (file.match(/.png/)) type = '.png';
  if (file.match(/.jpeg/)) type = '.jpeg';
  if (file.match(/.jpg/)) type = 'jpg';

  const [name] = file.split(/.png|.jpeg|.jpg/);
  return [name, type];
};

const getCurrentDateTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day}.${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
};

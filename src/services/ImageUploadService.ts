import multer_s3 from 'multer-s3';
import aws from 'aws-sdk';
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});
export class ImageUploadService {
  storage = multer_s3({
    s3: s3,
    bucket: '-', // 자신의 s3 버킷 이름
    contentType: multer_s3.AUTO_CONTENT_TYPE,
    acl: 'public-read', // 버킷에서 acl 관련 설정을 풀어줘야 사용할 수 있다.
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `contents/${Date.now()}_${file.originalname}`);
    },
  });
  static upload() {}
}

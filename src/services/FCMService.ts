import UserDAO from '../DAO/UserDAO';
import { ServiceAccount } from 'firebase-admin';
import admin from 'firebase-admin';

interface NotificationData {
  title: string;
  body: string;
  image: string;
  url: string;
  senderProfileId: string;
}

export class FCMService {
  static async post(id: number, token: string) {
    const user = await UserDAO.getUser(id);
    user.fcmToken = token;
    await UserDAO.save(user);
  }

  static async requestFriend(id: number, senderProfileId: number) {
    const messageData: NotificationData = {
      title: '새로운 프렌딩!',
      body: `새로운 프렌딩이에요!`,
      senderProfileId: String(senderProfileId),
      url: 'friending/addFriend',
      image: '', //이미지 추가필요
    };
    await FCMService.sendMessage(id, messageData);
  }

  static async sendMessage(id: number, messageData: NotificationData) {
    const serviceAccount: ServiceAccount = {
      projectId: process.env.PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    await admin.messaging().send({
      data: { ...messageData },
      token: (await UserDAO.getUser(id)).fcmToken,
    });
  }
}

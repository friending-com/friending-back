import UserDAO from '../DAO/UserDAO';
import { ServiceAccount } from 'firebase-admin';
import admin from 'firebase-admin';

export class FCMService {
  static async post(id: number, token: string) {
    const user = await UserDAO.getUser(id);
    user.fcmToken = token;
    await UserDAO.save(user);
  }

  static async sendMessage(id: number) {
    //키세팅해야함
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
      data: {},
      token: (await UserDAO.getUser(id)).fcmToken,
    });
  }
}

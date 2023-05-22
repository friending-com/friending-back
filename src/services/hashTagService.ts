import HashTagDAO from '../DAO/HashTagDAO';
import ErrorStatus from '../utils/ErrorStatus';

export class HashTagService {
  static async add(hashTagName: string, userId: number) {
    const hashTagCheck = await HashTagDAO.getHashTag(hashTagName);
    if (!hashTagCheck) {
      await HashTagDAO.createHashTag(hashTagName);
    }
    await HashTagDAO.addUser(userId, hashTagName);
  }
  static async search(hashTagName: string) {
    try {
      const userList = (await HashTagDAO.getHashTagUser(hashTagName)).users;
      return userList;
    } catch (err) {
      return [];
    }
  }

  static async delete(hashTagName: string, userId: number) {}
}

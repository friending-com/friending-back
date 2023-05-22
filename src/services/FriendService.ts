import FriendDAO from '../DAO/FriendDAO';
import UserDAO from '../DAO/UserDAO';
import ErrorStatus from '../utils/ErrorStatus';

export class FriendService {
  static async add(userId: number, subId: number) {
    await FriendDAO.addFriend(userId, subId);
  }

  static async delete(userId: number, subId: number) {
    await FriendDAO.deleteFriend(userId, subId);
  }

  static async show(userId: number) {
    const user = await FriendDAO.getFriendList(userId);
    return user.friends;
  }
}

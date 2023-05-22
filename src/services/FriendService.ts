import FriendDAO from '../DAO/FriendDAO';
import UserDAO from '../DAO/UserDAO';
import ErrorStatus from '../utils/ErrorStatus';

export class FriendService {
  static async add(userId: number, subId: number) {
    const user = await UserDAO.getProfile(userId);
    const subUser = await UserDAO.getProfile(subId);

    if (user && subUser) {
      // const userFriendList = await FriendDAO.getFriendList(userId);
      // const isAlreadyFriend = userFriendList.some((friend) => friend == subId);
      // if (isAlreadyFriend) throw new ErrorStatus('이미 친구입니다!', 400);
      await FriendDAO.addFriend(user, subUser);
    } else {
      throw new ErrorStatus('user를 찾을 수 없습니다', 400);
    }
  }

  static async delete(userId: number, subId: number) {
    await FriendDAO.deleteFriend(userId, subId);
  }

  static async show(userId: number) {
    const user = await UserDAO.getProfile(userId);
    if (!user) {
      throw new ErrorStatus('user가 존재하지 않습니다', 400);
    }
    const friendList = await FriendDAO.getFriendList(userId);
    const result = await Promise.all(
      friendList.map(async (friend) => await UserDAO.getProfile(friend))
    );
    return result;
  }
}

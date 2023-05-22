import { User } from '../entity/User';
import { UserRelation } from '../entity/UserRelation';
import UserDAO from './UserDAO';
import { AppDataSource } from './data-source';

export default class FriendDAO {
  static userRepo = AppDataSource.getRepository(User);

  static async addFriend(userId: number, subId: number) {
    const user = await FriendDAO.userRepo.findOne({
      where: {
        id: userId,
      },
    });
    const friend = await FriendDAO.userRepo.findOne({
      where: {
        id: subId,
      },
    });
    if (user && friend) {
      user.friends.push(friend);
      friend.friends.push(user);
      await FriendDAO.userRepo.save(user);
      await FriendDAO.userRepo.save(friend);
    }
  }

  static async getFriendList(id: number) {
    const queryResult = await FriendDAO.relationRepo.find({
      where: {
        userId: await UserDAO.getUser(id),
      },
    });
    const result = [];
    queryResult.forEach((relation) => {
      result.push(relation.subId);
    });
    return result;
  }

  static async deleteFriend(userId: number, subId: number) {
    await FriendDAO.relationRepo.delete({
      userId: await UserDAO.getUser(userId),
      subId: await UserDAO.getUser(subId),
    });
    await FriendDAO.relationRepo.delete({
      userId: await UserDAO.getUser(subId),
      subId: await UserDAO.getUser(userId),
    });
  }
}

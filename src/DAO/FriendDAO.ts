import { User } from '../entity/User';
import UserDAO from './UserDAO';
import { AppDataSource } from './data-source';

export default class FriendDAO {
  static userRepo = AppDataSource.getRepository(User);

  static async addFriend(userId: number, subId: number) {
    const user = await FriendDAO.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: {
        friends: true,
      },
    });
    const friend = await FriendDAO.userRepo.findOne({
      where: {
        id: subId,
      },
      relations: {
        friends: true,
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
    return await FriendDAO.userRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        friends: true,
      },
    });
  }

  static async deleteFriend(userId: number, subId: number) {
    const user = await FriendDAO.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: {
        friends: true,
      },
    });
    const friend = await FriendDAO.userRepo.findOne({
      where: {
        id: subId,
      },
      relations: {
        friends: true,
      },
    });
    user.friends = user.friends.filter((user) => user === friend);
    friend.friends = friend.friends.filter((friend) => friend === user);
    await FriendDAO.userRepo.save(user);
    await FriendDAO.userRepo.save(friend);
  }
}

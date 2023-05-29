import { Profile } from '../entity/Profile';
import { User } from '../entity/User';
import UserDAO from './UserDAO';
import { AppDataSource } from './data-source';

export default class FriendDAO {
  static profileRepo = AppDataSource.getRepository(Profile);

  static async addFriend(profileId: number, subProfileId: number) {
    const user = await FriendDAO.profileRepo.findOne({
      where: {
        id: profileId,
      },
      relations: {
        friends: true,
      },
    });
    const friend = await FriendDAO.profileRepo.findOne({
      where: {
        id: subProfileId,
      },
      relations: {
        friends: true,
      },
    });
    if (user && friend) {
      user.friends.push(friend);
      friend.friends.push(user);
      await FriendDAO.profileRepo.save(user);
      await FriendDAO.profileRepo.save(friend);
    }
  }

  static async getFriendList(profileId: number) {
    return await FriendDAO.profileRepo.findOne({
      where: {
        id: profileId,
      },
      relations: {
        friends: true,
      },
    });
  }

  static async deleteFriend(profileId: number, subProfileId: number) {
    const user = await FriendDAO.profileRepo.findOne({
      where: {
        id: profileId,
      },
      relations: {
        friends: true,
      },
    });
    const friend = await FriendDAO.profileRepo.findOne({
      where: {
        id: subProfileId,
      },
      relations: {
        friends: true,
      },
    });
    user.friends = user.friends.filter((user) => user === friend);
    friend.friends = friend.friends.filter((friend) => friend === user);
    await FriendDAO.profileRepo.save(user);
    await FriendDAO.profileRepo.save(friend);
  }
}

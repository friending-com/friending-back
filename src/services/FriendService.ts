import FriendDAO from '../DAO/FriendDAO';
import UserDAO from '../DAO/UserDAO';
import { Profile } from '../entity/Profile';
import ErrorStatus from '../utils/ErrorStatus';
import { removeSameObjectFromArray } from '../utils/utils';

export class FriendService {
  static async add(profileId: number, subProfileId: number) {
    await FriendDAO.addFriend(profileId, subProfileId);
  }

  static async delete(profileId: number, subProfileId: number) {
    await FriendDAO.deleteFriend(profileId, subProfileId);
  }

  static async show(profileId: number) {
    const user = await FriendDAO.getFriendList(profileId);
    return user.friends;
  }
  static async getFriendProfiles(userId: number) {
    const user = await UserDAO.getUserFriendsProfiles(userId);
    const friendList = user.profiles.map((profile) => {
      return [...profile.friends];
    });
    const flat = friendList.flat();
    return removeSameObjectFromArray(flat);
  }
}

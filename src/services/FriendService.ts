import FriendDAO from '../DAO/FriendDAO';
import { GroupDAO } from '../DAO/GroupDAO';
import ProfileDAO from '../DAO/ProfileDAO';
import UserDAO from '../DAO/UserDAO';
import { removeSameObjectFromArray } from '../utils/utils';

export class FriendService {
  static async add(profileId: number, subProfileId: number) {
    await FriendDAO.addFriend(profileId, subProfileId);
    const { user: user1 } = await ProfileDAO.getProfileAndUser(profileId);
    const { user: user2 } = await ProfileDAO.getProfileAndUser(subProfileId);
    await GroupDAO.mergeGroup(user1.group.id, user2.group.id);
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

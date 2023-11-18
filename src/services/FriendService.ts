import FriendDAO from '../DAO/FriendDAO';
import { GroupDAO } from '../DAO/GroupDAO';
import ProfileDAO from '../DAO/ProfileDAO';
import UserDAO from '../DAO/UserDAO';
import { removeSameObjectFromArray } from '../utils/utils';

export class FriendService {
  static async add(profileId: number, subProfileId: number) {
    await FriendDAO.addFriend(profileId, subProfileId);
    const group1 = await ProfileDAO.getGroup(profileId);
    const group2 = await ProfileDAO.getGroup(subProfileId);
    if (group1.id === group2.id) return;
    await GroupDAO.mergeGroup(group1.id, group2.id);
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

import FriendDAO from '../DAO/FriendDAO';
import UserDAO from '../DAO/UserDAO';
import ErrorStatus from '../utils/ErrorStatus';

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
    const friendList = [];
    const friendSet = new Set();
    user.profiles.forEach((profile) =>
      profile.friends.forEach((friend) => {
        if (!friendSet.has(friend.id)) {
          friendSet.add(friend.id);
          friendList.push(friend);
        }
      })
    );
    return friendList;
  }
}

import FriendDAO from '../DAO/FriendDAO';
import { GroupDAO } from '../DAO/GroupDAO';
import ProfileDAO from '../DAO/ProfileDAO';
import UserDAO from '../DAO/UserDAO';
import {
  FriendAddDTO,
  FriendDeleteDTO,
  FriendGetAllDTO,
  FriendGetDTO,
} from '../DTO/FriendDTO';
import { removeSameObjectFromArray } from '../utils/utils';

export class FriendService {
  static async add(friendAddDto: FriendAddDTO) {
    const { userProfileId, subProfileId } = friendAddDto;
    await FriendDAO.addFriend(userProfileId, subProfileId);
    const group1 = await ProfileDAO.getGroup(userProfileId);
    const group2 = await ProfileDAO.getGroup(subProfileId);
    if (group1.id === group2.id) return;
    await GroupDAO.mergeGroup(group1.id, group2.id);
  }

  static async delete(friendDeleteDTO: FriendDeleteDTO) {
    await FriendDAO.deleteFriend(
      friendDeleteDTO.userProfileId,
      friendDeleteDTO.subProfileId
    );
  }

  static async show(friendGetDTO: FriendGetDTO) {
    const user = await FriendDAO.getFriendList(friendGetDTO.profileId);
    return user.friends;
  }

  static async getFriendProfiles(friendGetAlldto: FriendGetAllDTO) {
    const user = await UserDAO.getUserFriendsProfiles(friendGetAlldto.userId);
    const friendList = user.profiles.map((profile) => {
      return [...profile.friends];
    });
    const flat = friendList.flat();
    return removeSameObjectFromArray(flat);
  }
}

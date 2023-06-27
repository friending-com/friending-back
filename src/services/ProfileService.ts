import ProfileDAO from '../DAO/ProfileDAO';
import UserDAO from '../DAO/UserDAO';
import { ProfileCreateData, UpdateData } from '../types/profileData';
import ErrorStatus from '../utils/ErrorStatus';

export default class ProfileService {
  static async getProfile(userId: number, findProfileId: number) {
    //userId의 user가 findProfileId의 프로필을 소유하는지, 친구인지 확인해야함

    //findProfileId의 소유권확인
    const findProfile = await ProfileDAO.getProfileAndUser(findProfileId);
    if (findProfile.user.id == userId) {
      const result = {};
      Object.entries(findProfile).forEach(([key, value]) => {
        if (key != 'user') result[key] = value;
      });
      return result;
    }
    //userId에 해당하는 프로필 중 하나가 findProfile과 친구인지 확인

    const userProfiles = (await UserDAO.getUserProfiles(userId)).profiles;
    const profileIds = userProfiles.map((profile) => profile.id);
    const findProfilesFriendsList = (
      await ProfileDAO.getProfileFriends(findProfileId)
    ).friends;
    for (const id of profileIds) {
      if (findProfilesFriendsList.some((profile) => profile.id === id)) {
        const result = {};
        Object.entries(findProfile).forEach(([key, value]) => {
          if (key != 'user') result[key] = value;
        });
        return result;
      }
    }
    throw new ErrorStatus('권한이 없습니다', 500);
  }
  static async createProfile(profileData: ProfileCreateData) {
    const profile = await ProfileDAO.createProfile(profileData); //프로필을 생성함
    const user = await UserDAO.getUserProfiles(profileData.userId); //user의 전체 프로필을 가져옴
    user.profiles.push(profile);
    await UserDAO.save(user);
    return profile;
  }

  static async modifyProfile(profileData: UpdateData) {
    const user = await UserDAO.getUserProfiles(profileData.userId);
    if (!user.profiles.some((profile) => profile.id === profileData.id)) {
      throw new ErrorStatus('프로필 수정권한이 없습니다!', 400);
    }
    await ProfileDAO.modify(profileData);
  }
}

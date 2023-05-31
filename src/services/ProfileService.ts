import ProfileDAO from '../DAO/ProfileDAO';
import UserDAO from '../DAO/UserDAO';
import { ProfileCreateData, UpdateData } from '../types/profileData';
import ErrorStatus from '../utils/ErrorStatus';

export default class ProfileService {
  static async getProfile(userProfileId: number, findProfileId: number) {
    const userProfile = await ProfileDAO.getProfile(userProfileId);
    const findProfile = await ProfileDAO.getProfileFriends(findProfileId);
    if (findProfile.friends.some((friend) => friend.id === userProfile.id)) {
      return await ProfileDAO.getProfile(findProfile.id);
    } else {
      throw new ErrorStatus('친구가 아닙니다!', 400);
    }
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

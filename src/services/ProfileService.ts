import ProfileDAO from '../DAO/ProfileDAO';
import UserDAO from '../DAO/UserDAO';
import { ProfileCreateData, UpdateData } from '../types/profileData';

export default class ProfileService {
  static async createProfile(userId: number, profileData: ProfileCreateData) {
    const profile = await ProfileDAO.createProfile(profileData); //프로필을 생성함
    const user = await UserDAO.getUserProfiles(userId); //user의 전체 프로필을 가져옴
    user.profiles.push(profile);
    await UserDAO.save(user);
    return profile;
  }

  static async setMainProfile(userId: number, profileId: number) {
    const profile = await ProfileDAO.getProfile(profileId);
    const user = await UserDAO.getUserProfiles(userId);
    const previousMain = user.profiles.find(
      (profile) => profile.isMain == true
    );
    if (previousMain) {
      previousMain.isMain = false;
      await ProfileDAO.save(previousMain);
    }
    profile.isPublic = true;
    profile.isMain = true;

    await ProfileDAO.save(profile);
    await UserDAO.save(user);
  }

  static async modifyProfile(profileData: UpdateData) {
    await ProfileDAO.modify(profileData);
  }
}

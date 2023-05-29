import ProfileDAO from '../DAO/ProfileDAO';
import UserDAO from '../DAO/UserDAO';
import { ProfileCreateData, UpdateData } from '../types/profileData';
import ErrorStatus from '../utils/ErrorStatus';

export default class ProfileService {
  static async getMainProfile(userId: number) {
    const user = await UserDAO.getUserProfiles(userId);
    const mainProfileId = user.profiles.find((profile) => profile.isMain).id;
    const mainProfile = await ProfileDAO.getProfile(mainProfileId);
    return {
      name: user.name,
      age: user.age,
      ...mainProfile,
    };
  }

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
      await ProfileDAO.modify({ id: previousMain.id, isMain: false });
    }
    await ProfileDAO.modify({ id: profile.id, isMain: true, isPublic: true });
  }

  static async modifyProfile(profileData: UpdateData) {
    await ProfileDAO.modify(profileData);
  }
}
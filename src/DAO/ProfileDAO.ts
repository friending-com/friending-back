import { Profile } from '../entity/Profile';
import { User } from '../entity/User';
import {
  ProfileCreateData,
  SignUpData,
  UpdateData,
} from '../types/profileData';
import { AppDataSource } from './data-source';

export default class ProfileDAO {
  static profileRepo = AppDataSource.getRepository(Profile);

  static async createProfile(profileData: ProfileCreateData) {
    const profile = new Profile();
    profile.discord = profileData.discord;
    profile.facebook = profileData.facebook;
    profile.instagram = profileData.instagram;
    profile.kakaoTalk = profileData.kakaoTalk;
    profile.line = profileData.line;
    profile.naverBand = profileData.naverBand;
    profile.naverBlog = profileData.naverBlog;
    profile.telegram = profileData.telegram;
    profile.twitter = profileData.twitter;
    profile.phone = profileData.phone;
    profile.isPublic = profileData.isPublic;
    await ProfileDAO.profileRepo.save(profile);
    return profile;
  }

  static async getProfile(id: number) {
    return await ProfileDAO.profileRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        hashTags: true,
      },
    });
  }

  static async getProfileAndUser(id: number) {
    return await ProfileDAO.profileRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
        hashTags: true,
      },
    });
  }

  static async getProfileFriends(id: number) {
    return await ProfileDAO.profileRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        friends: true,
        user: true,
        hashTags: true,
      },
    });
  }
  static async save(profile: Profile) {
    await ProfileDAO.profileRepo.save(profile);
  }

  static async modify(profile: UpdateData) {
    const profileData = {};
    Object.entries(profile).forEach(([key, value]) => {
      if (key != 'userId') profileData[key] = value;
    });
    await ProfileDAO.profileRepo.update(profile.id, profileData);
  }

  static async selectAll() {
    const result = (await ProfileDAO.profileRepo
      .createQueryBuilder()
      .select('*')
      .getRawMany()) as Profile[];
    return result;
  }
}

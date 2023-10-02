import { Like } from 'typeorm';
import { Profile } from '../entity/Profile';
import { User } from '../entity/User';
import { ProfileCreateData, UpdateData } from '../types/profileData';
import { AppDataSource } from './data-source';
import { ProfileCreateDTO } from '../DTO/ProfileDTO';

export default class ProfileDAO {
  static profileRepo = AppDataSource.getRepository(Profile);

  static async createProfile(profileData: ProfileCreateDTO) {
    const profile = new Profile();
    profile.usage = profileData.usage;
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
    profile.name = profileData.name;
    profile.email = profileData.email;
    profile.nickName = profileData.nickName;
    profile.isPublic = profileData.isPublic;
    profile.image = profileData.image;
    profile.info = profileData.info;
    profile.thread = profileData.thread;
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
        workSpace: true,
      },
    });
  }
  static async getProfileWorkSpace(id: number) {
    return await ProfileDAO.profileRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        workSpace: true,
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
      if (key != 'userId' && key != 'hashTags' && key != 'workSpace')
        profileData[key] = value;
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
  static async delete(id: number) {
    await ProfileDAO.profileRepo.delete(id);
  }

  static async getProfileByName(name: string) {
    return await ProfileDAO.profileRepo.find({
      where: [
        {
          name: Like(`%${name}%`),
        },
      ],
    });
  }
}

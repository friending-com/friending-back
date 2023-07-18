import { Like } from 'typeorm';
import { HashTag } from '../entity/HashTag';
import { Profile } from '../entity/Profile';
import { User } from '../entity/User';
import { AppDataSource } from './data-source';

export default class HashTagDAO {
  static hashTagRepo = AppDataSource.getRepository(HashTag);
  static profileRepo = AppDataSource.getRepository(Profile);

  static async createHashTag(name: string) {
    const hashTag = new HashTag();
    hashTag.hashTag = name;
    await HashTagDAO.hashTagRepo.save(hashTag);
    return hashTag;
  }

  static async getHashTag(hashTagName: string) {
    return await HashTagDAO.hashTagRepo.findOne({
      where: {
        hashTag: hashTagName,
      },
    });
  }

  static async getHashTagAutoMatching(query: string) {
    return await HashTagDAO.hashTagRepo.find({
      where: {
        hashTag: Like(`%${query}%`),
      },
    });
  }

  static async getHashTagProfile(hashTagName: string) {
    return await HashTagDAO.hashTagRepo.findOne({
      where: {
        hashTag: hashTagName,
      },
      relations: {
        profiles: true,
      },
    });
  }

  static async save(hashTag: HashTag) {
    await HashTagDAO.hashTagRepo.save(hashTag);
  }

  static async deleteHashTagProfile(hashTagName: string, profileId: number) {
    const hashTag = await HashTagDAO.hashTagRepo.findOne({
      where: {
        hashTag: hashTagName,
      },
      relations: {
        profiles: true,
      },
    });
    const hashTagId = hashTag.id;
    const profile = await HashTagDAO.profileRepo.findOne({
      where: {
        id: profileId,
      },
      relations: {
        hashTags: true,
      },
    });
    profile.hashTags = profile.hashTags.filter(
      (hashTag) => hashTag.id != hashTagId
    );
    hashTag.profiles = hashTag.profiles.filter(
      (profile) => profile.id != profileId
    );
    await HashTagDAO.profileRepo.save(profile);
  }
}

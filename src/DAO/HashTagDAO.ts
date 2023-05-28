import { HashTag } from '../entity/HashTag';
import { Profile } from '../entity/Profile';
import { User } from '../entity/User';
import { AppDataSource } from './data-source';

export default class HashTagDAO {
  static hashTagRepo = AppDataSource.getRepository(HashTag);

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
}

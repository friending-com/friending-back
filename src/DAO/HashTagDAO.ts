import { HashTag } from '../entity/HashTag';
import { AppDataSource } from './data-source';

export default class HashTagDAO {
  static async addHashTag(name: string) {
    const hashTagRepo = AppDataSource.getRepository(HashTag);
    const hashTag = new HashTag();
    hashTag.hashTag = name;
    await hashTagRepo.save(hashTag);
    return hashTag.id;
  }

  static async getHashTagId(hashTagString: string) {
    const hashTagRepo = AppDataSource.getRepository(HashTag);
    const result = await hashTagRepo.findOne({
      where: {
        hashTag: hashTagString,
      },
    });
    if (result) {
      return result.id;
    } else {
      return null;
    }
  }
}

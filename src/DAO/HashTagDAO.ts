import { HashTag } from '../entity/HashTag';
import { AppDataSource } from './data-source';

export default class HashTagDAO {
  static hashTagRepo = AppDataSource.getRepository(HashTag);

  static async createHashTag(name: string) {
    const hashTag = new HashTag();
    hashTag.hashTag = name;
    await HashTagDAO.hashTagRepo.save(hashTag);
    return hashTag.id;
  }

  static async getHashTagId(hashTagString: string) {
    const result = await HashTagDAO.hashTagRepo.findOne({
      where: {
        hashTag: hashTagString,
      },
    });
    if (result) {
      return result.id;
    }
    return null;
  }

  static async getHashTagName(hashTagId: number) {
    const result = await HashTagDAO.hashTagRepo.findOne({
      where: {
        id: hashTagId,
      },
    });
    return result;
  }
}

import { HashTagUser } from '../entity/HashTagUser';
import { AppDataSource } from './data-source';

export default class HashTagRelationDAO {
  static async addRelation(hashTagId: number, userId: number) {
    const hashTagRepo = AppDataSource.getRepository(HashTagUser);
    const hashTagRelation = new HashTagUser();
    hashTagRelation.hashTagId = hashTagId;
    hashTagRelation.userId = userId;
    await hashTagRepo.save(hashTagRelation);
  }

  static async searchRelationByHashTagId(hashTagId: number) {
    const hashTagUserRepo = AppDataSource.getRepository(HashTagUser);
    const result = await hashTagUserRepo.find({
      where: {
        hashTagId: hashTagId,
      },
    });
    return result;
  }
  static async searchRelationByUserId(userId: number) {
    const hashTagUserRepo = AppDataSource.getRepository(HashTagUser);
    const result = await hashTagUserRepo.find({
      where: {
        userId: userId,
      },
    });
    return result;
  }
}

import { HashTagRelation } from '../entity/HashTagRelation';
import { AppDataSource } from './data-source';

export default class HashTagRelationDAO {
  static hashTagRelationRepo = AppDataSource.getRepository(HashTagRelation);

  static async addRelation(hashTagId: number, userId: number) {
    const hashTagRelation = new HashTagRelation();
    hashTagRelation.hashTagId = hashTagId;
    hashTagRelation.userId = userId;
    await HashTagRelationDAO.hashTagRelationRepo.save(hashTagRelation);
  }

  static async searchRelationByHashTagId(hashTagId: number) {
    const result = await HashTagRelationDAO.hashTagRelationRepo.find({
      where: {
        hashTagId: hashTagId,
      },
    });
    return result;
  }
  static async searchRelationByUserId(userId: number) {
    const result = await HashTagRelationDAO.hashTagRelationRepo.find({
      where: {
        userId: userId,
      },
    });
    return result;
  }

  static async deleteRelation(userId: number, hashTagId: number) {
    await HashTagRelationDAO.hashTagRelationRepo.delete({
      userId: userId,
      hashTagId: hashTagId,
    });
  }
}

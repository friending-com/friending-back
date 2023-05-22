import { HashTagRelation } from '../entity/HashTagRelation';
import { User } from '../entity/User';
import HashTagDAO from './HashTagDAO';
import UserDAO from './UserDAO';
import { AppDataSource } from './data-source';

export default class HashTagRelationDAO {
  static hashTagRelationRepo = AppDataSource.getRepository(HashTagRelation);

  static async addRelation(hashTagId: number, userId: number) {
    const hashTagRelation = new HashTagRelation();
    hashTagRelation.hashTagId = await HashTagDAO.getHashTag(hashTagId);
    hashTagRelation.userId = await UserDAO.getUser(userId);
    await HashTagRelationDAO.hashTagRelationRepo.save(hashTagRelation);
  }

  static async searchRelationByHashTagId(hashTagId: number) {
    const result = await HashTagRelationDAO.hashTagRelationRepo.find({
      where: {
        hashTagId: await HashTagDAO.getHashTag(hashTagId),
      },
    });
    return result;
  }

  static async searchRelationByUserId(user: User) {
    try {
      const result = await HashTagRelationDAO.hashTagRelationRepo.find({
        where: {
          userId: user,
        },
        relations: ['hashTagId'],
      });
      return result;
    } catch (err) {
      if (err.name === 'TypeError') {
        return [];
      } else {
        throw err;
      }
    }
  }

  static async deleteRelation(userId: number, hashTagId: number) {
    await HashTagRelationDAO.hashTagRelationRepo.delete({
      userId: await UserDAO.getUser(userId),
      hashTagId: await HashTagDAO.getHashTag(hashTagId),
    });
  }
}

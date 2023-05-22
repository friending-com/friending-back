import { HashTag } from '../entity/HashTag';
import { User } from '../entity/User';
import { AppDataSource } from './data-source';

export default class HashTagDAO {
  static hashTagRepo = AppDataSource.getRepository(HashTag);
  static userRepo = AppDataSource.getRepository(User);

  static async createHashTag(name: string) {
    const hashTag = new HashTag();
    hashTag.hashTag = name;
    await HashTagDAO.hashTagRepo.save(hashTag);
    return hashTag.id;
  }

  static async addUser(userId: number, hashTagName: string) {
    const user = await HashTagDAO.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: {
        hashTags: true,
      },
    });

    const hashTag = await HashTagDAO.hashTagRepo.findOne({
      where: {
        hashTag: hashTagName,
      },
      relations: {
        users: true,
      },
    });
    user.hashTags.push(hashTag);
    hashTag.users.push(user);
    await HashTagDAO.hashTagRepo.save(hashTag);
    await HashTagDAO.userRepo.save(user);
  }

  static async getHashTag(hashTagName: string) {
    return await HashTagDAO.hashTagRepo.findOne({
      where: {
        hashTag: hashTagName,
      },
    });
  }

  static async getHashTagUser(hashTagName: string) {
    return await HashTagDAO.hashTagRepo.findOne({
      where: {
        hashTag: hashTagName,
      },
      relations: {
        users: true,
      },
    });
  }
}

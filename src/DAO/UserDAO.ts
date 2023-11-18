import { User } from '../entity/User';
import { UpdateData } from '../types/profileData';
import { AppDataSource } from './data-source';

export default class UserDAO {
  static userRepo = AppDataSource.getRepository(User);

  static async makeNewUser(email: string) {
    const user = new User();
    user.email = email;
    return await UserDAO.userRepo.save(user);
  }

  static async getUser(id: number) {
    return await UserDAO.userRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  static async getUserProfilesForEdit(userId: number) {
    return await UserDAO.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: {
        profiles: true,
      },
    });
  }
  static async getUserProfiles(userId: number) {
    const user = await UserDAO.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profiles', 'profile')
      .leftJoinAndSelect('profile.hashTags', 'hashTag')
      .leftJoinAndSelect('profile.workSpace', 'workSpace')
      .where('user.id = :userId', { userId })
      .getOne();
    return user;
  }

  static async getUserFriendsProfiles(userId: number) {
    const friendArr = await UserDAO.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profiles', 'profile')
      .leftJoinAndSelect('profile.friends', 'friend')
      .where('user.id=:userId', { userId })
      .getOne();
    return friendArr;
  }

  static async update(updateData: UpdateData) {
    await UserDAO.userRepo.update(updateData.id, updateData);
  }

  static async save(user: User) {
    await UserDAO.userRepo.save(user);
  }

  static async getUserByEmail(email: string) {
    return await UserDAO.userRepo.findOne({
      where: {
        email: email,
      },
    });
  }
}

import { Like } from 'typeorm';
import { Profile } from '../entity/Profile';
import { User } from '../entity/User';
import { friend } from '../routes/friend';
import { SignUpData, UpdateData } from '../types/profileData';
import { AppDataSource } from './data-source';

export default class UserDAO {
  static userRepo = AppDataSource.getRepository(User);
  static async getUser(id: number) {
    return await UserDAO.userRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  static async getUserProfiles(userId: number) {
    return await UserDAO.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: {
        profiles: true,
      },
    });
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
  static async signup(signUpData: SignUpData) {
    const user = new User();
    user.name = signUpData.name;
    user.age = signUpData.age;
    await UserDAO.userRepo.save(user);
  }

  static async getUserProfilesByName(name: string) {
    return await UserDAO.userRepo.findOne({
      where: {
        name: Like(`%${name}%`),
      },
      relations: {
        profiles: true,
      },
    });
  }

  static async update(updateData: UpdateData) {
    await UserDAO.userRepo.update(updateData.id, updateData);
  }

  static async save(user: User) {
    await UserDAO.userRepo.save(user);
  }
}

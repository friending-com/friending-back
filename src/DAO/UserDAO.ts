import { Profile } from '../entity/Profile';
import { User } from '../entity/User';
import { SignUpData, UpdateData } from '../types/profileData';
import { AppDataSource } from './data-source';

export default class UserDAO {
  static userRepo = AppDataSource.getRepository(User);
  static async getUser(id: number) {
    return await UserDAO.userRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        profiles: true,
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

  static async getUserFriends(id: number) {
    return await UserDAO.userRepo.findOne({
      where: { id: id },
      relations: {
        friends: true,
      },
    });
  }

  static async signup(signUpData: SignUpData) {
    const user = new User();
    user.name = signUpData.name;
    user.age = signUpData.age;
    await UserDAO.userRepo.save(user);
  }

  static async update(updateData: UpdateData) {
    await UserDAO.userRepo.update(updateData.id, updateData);
  }

  static async save(user: User) {
    await UserDAO.userRepo.save(user);
  }
}

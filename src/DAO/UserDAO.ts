import { User } from '../entity/User';
import { SignUpData } from '../types/signUpData';
import { AppDataSource } from './data-source';

export default class UserDAO {
  static userRepo = AppDataSource.getRepository(User);
  static async getProfile(id: number) {
    const profile = await UserDAO.userRepo.findOne({
      where: {
        id: id,
      },
    });
    return profile;
  }

  static async signup(signUpData: SignUpData) {
    const user = new User();
    user.name = signUpData.name;
    user.instagram = signUpData.instagram;
    user.twitter = signUpData.twitter;
    user.phone = signUpData.phone;
    user.facebook = signUpData.facebook;
    user.kakaoTalk = signUpData.kakaoTalk;
    user.age = signUpData.age;
    user.discord = signUpData.discord;
    user.line = signUpData.line;
    user.naverBlog = signUpData.naverBlog;
    user.naverBand = signUpData.naverBand;
    user.telegram = signUpData.telegram;
    await UserDAO.userRepo.save(user);
  }
}

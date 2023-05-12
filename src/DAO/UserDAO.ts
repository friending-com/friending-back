import { User } from '../entity/User';
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

  static async signup(
    name,
    instagram,
    twitter,
    phone,
    facebook,
    kakaoTalk,
    age,
    discord,
    line,
    naverBlog,
    naverBand,
    telegram
  ) {
    const user = new User();
    user.name = name;
    user.instagram = instagram;
    user.twitter = twitter;
    user.phone = phone;
    user.facebook = facebook;
    user.kakaoTalk = kakaoTalk;
    user.age = age;
    user.discord = discord;
    user.line = line;
    user.naverBlog = naverBlog;
    user.naverBand = naverBand;
    user.telegram = telegram;
    await UserDAO.userRepo.save(user);
  }
}

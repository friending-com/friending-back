import { AppDataSource } from './data-source';
import { User } from '../entity/User';

const signup = async (
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
) => {
  try {
    const userRepo = AppDataSource.getRepository(User);
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
    await userRepo.save(user);
  } catch (err) {
    console.log(err);
  }
};
export default signup;

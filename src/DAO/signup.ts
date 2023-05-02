import { AppDataSource } from './data-source';
import { User } from '../entity/User';

const signupExecute = async (
  name,
  instagram,
  twitter,
  phone,
  facebook,
  kakaoTalk,
  age
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
    await userRepo.save(user);
  } catch (err) {
    console.log(err);
  }
};
export default signupExecute;

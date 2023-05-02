import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const signupExecute = (
  name,
  instagram,
  twitter,
  phone,
  facebook,
  kakaoTalk,
  age
) => {
  AppDataSource.initialize()
    .then(async () => {
      const user = new User();
      user.name = name;
      user.instagram = instagram;
      user.twitter = twitter;
      user.phone = phone;
      user.facebook = facebook;
      user.kakaoTalk = kakaoTalk;
      user.age = age;
      await AppDataSource.manager.save(user);
      console.log('Saved a new user with id: ' + user.id);

      console.log('Loading users from the database...');
      const users = await AppDataSource.manager.find(User);
      console.log('Loaded users: ', users);

      console.log(
        'Here you can setup and run express / fastify / any other framework.'
      );
    })
    .catch((error) => console.log(error));
};
export default signupExecute;

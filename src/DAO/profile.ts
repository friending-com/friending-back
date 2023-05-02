import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const getProfile = async (id: number) => {
  await AppDataSource.initialize();
  const profile = await AppDataSource.manager.findOne(User, {
    where: {
      id: id,
    },
  });
  return profile;
};
export default getProfile;

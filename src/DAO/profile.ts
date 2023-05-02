import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const getProfile = async (id: number) => {
  const userRepo = AppDataSource.getRepository(User);
  const profile = await userRepo.findOne({
    where: {
      id: id,
    },
  });
  return profile;
};
export default getProfile;

import { User } from '../../entity/User';
import { AppDataSource } from '../data-source';

export const addHashTag = async (hashTagId: number, userId: number) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({
    where: {
      id: userId,
    },
  });
  user.hashTags.push(hashTagId);
  await userRepo.save(user);
};

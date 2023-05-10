import { User } from '../../entity/User';
import { stringify } from '../../utils/stringify';
import { AppDataSource } from '../data-source';

export const addHashTag = async (hashTagId: number, userId: number) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({
    where: {
      id: userId,
    },
  });
  const newHashTagList = stringify(user.hashTags, hashTagId);
  user.hashTags = newHashTagList;
  await userRepo.save(user);
};

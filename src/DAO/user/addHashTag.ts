import { User } from '../../entity/User';
import { addHashString } from '../../utils/stringify';
import { AppDataSource } from '../data-source';

export const addHashTag = async (hashTagId: number, userId: number) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({
    where: {
      id: userId,
    },
  });
  console.log(user);
  if (user.hashTags) {
    const newHashTagList = addHashString(user.hashTags, hashTagId);
    user.hashTags = newHashTagList;
  } else {
    user.hashTags = String(hashTagId);
  }

  await userRepo.save(user);
};

import { HashTagUser } from '../../entity/HashTagUser';
import { AppDataSource } from '../data-source';

export const searchRelation = async (hashTagId: number) => {
  const hashTagUserRepo = AppDataSource.getRepository(HashTagUser);
  const result = await hashTagUserRepo.find({
    where: {
      hashTagId: hashTagId,
    },
  });
  return result;
};

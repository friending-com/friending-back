import { stringify } from '../../utils/stringify';
import { HashTag } from '../../entity/HashTag';
import { AppDataSource } from '../data-source';

export const addUser = async (hashTagId: number, userId: number) => {
  const hashTagRepo = AppDataSource.getRepository(HashTag);
  const hashTagFindResult = await hashTagRepo.findOne({
    where: {
      id: hashTagId,
    },
  });
  hashTagFindResult.userId = stringify(hashTagFindResult.userId, userId);
  await hashTagRepo.save(hashTagFindResult);
};

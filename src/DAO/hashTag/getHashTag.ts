import { HashTag } from '../../entity/HashTag';
import { AppDataSource } from '../data-source';

export const getHashTag = async (hashTagString: string) => {
  const hashTagRepo = AppDataSource.getRepository(HashTag);
  const result = await hashTagRepo.findOne({
    where: {
      hashTag: hashTagString,
    },
  });
  if (result) {
    return result.id;
  } else {
    return null;
  }
};

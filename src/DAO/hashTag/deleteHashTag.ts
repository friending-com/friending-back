import { HashTag } from '../../entity/HashTag';
import { numberize, stringify } from '../../utils/stringify';
import { AppDataSource } from '../data-source';

export const deleteHashTag = async (hashTagId: number, userId: number) => {
  const hashTagRepo = AppDataSource.getRepository(HashTag);
  const hashTagResult = await hashTagRepo.findOne({
    where: {
      id: hashTagId,
    },
  });
  const hashTagArray = numberize(hashTagResult.hashTag);
  hashTagResult.hashTag = stringify(
    hashTagArray.filter((each) => each != userId)
  );
  if (hashTagResult.hashTag) {
    hashTagRepo.save(hashTagResult);
  } else {
    hashTagRepo.remove(hashTagResult);
  }
};

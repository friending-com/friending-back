import { HashTag } from '../../entity/HashTag';
import { AppDataSource } from '../data-source';

export const addHashTag = async (name: string) => {
  const hashTagRepo = AppDataSource.getRepository(HashTag);
  const hashTag = new HashTag();
  hashTag.hashTag = name;
  await hashTagRepo.save(hashTag);
  return hashTag.id;
};

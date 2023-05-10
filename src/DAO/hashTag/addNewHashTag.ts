import { HashTag } from '../../entity/HashTag';
import { AppDataSource } from '../data-source';

export const addNewHashTag = async (name: string, userId: number) => {
  const hashTagRepo = AppDataSource.getRepository(HashTag);
  const hashTag = new HashTag();
  hashTag.hashTag = name;
  hashTag.userId.push(userId);
  await hashTagRepo.save(hashTag);
  return hashTag.id;
};

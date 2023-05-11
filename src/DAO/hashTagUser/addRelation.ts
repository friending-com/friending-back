import { HashTagUser } from '../../entity/HashTagUser';
import { AppDataSource } from '../data-source';

export const addRelation = async (hashTagId: number, userId: number) => {
  const hashTagRepo = AppDataSource.getRepository(HashTagUser);
  const hashTagRelation = new HashTagUser();
  hashTagRelation.hashTagId = hashTagId;
  hashTagRelation.userId = userId;
  await hashTagRepo.save(hashTagRelation);
};

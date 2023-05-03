import { Relation } from '../entity/Relation';
import { AppDataSource } from './data-source';

export const getFriendList = async (id: number) => {
  const relationRepo = AppDataSource.getRepository(Relation);
  const queryResult = await relationRepo.find({
    where: {
      userId: id,
    },
  });
  const result = [];
  queryResult.forEach((relation) => {
    result.push(relation.subId);
  });
  return result;
};

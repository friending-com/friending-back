import { Relation } from '../entity/Relation';
import { AppDataSource } from './data-source';

export const addFriend = (userId: number, subId: number) => {
  const relationRepo = AppDataSource.getRepository(Relation);
  const relationOne = new Relation();
  const relationTwo = new Relation();

  relationOne.userId = userId;
  relationOne.subId = subId;

  relationTwo.userId = subId;
  relationTwo.subId = userId;

  [relationOne, relationTwo].forEach((relation) => {
    relationRepo.save(relation);
  });
};

import { UserRelation } from '../entity/UserRelation';
import { AppDataSource } from './data-source';

export default class FriendDAO {
  static async addFriend(userId: number, subId: number) {
    const relationRepo = AppDataSource.getRepository(UserRelation);
    const relationOne = new UserRelation();
    const relationTwo = new UserRelation();

    relationOne.userId = userId;
    relationOne.subId = subId;

    relationTwo.userId = subId;
    relationTwo.subId = userId;

    [relationOne, relationTwo].forEach((relation) => {
      relationRepo.save(relation);
    });
  }

  static async getFriendList(id: number) {
    const relationRepo = AppDataSource.getRepository(UserRelation);
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
  }
}

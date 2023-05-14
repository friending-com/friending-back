import { UserRelation } from '../entity/UserRelation';
import { AppDataSource } from './data-source';

export default class FriendDAO {
  static relationRepo = AppDataSource.getRepository(UserRelation);

  static async addFriend(userId: number, subId: number) {
    const relationOne = new UserRelation();
    const relationTwo = new UserRelation();

    relationOne.userId = userId;
    relationOne.subId = subId;

    relationTwo.userId = subId;
    relationTwo.subId = userId;

    [relationOne, relationTwo].forEach((relation) => {
      FriendDAO.relationRepo.save(relation);
    });
  }

  static async getFriendList(id: number) {
    const queryResult = await FriendDAO.relationRepo.find({
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

  static async deleteFriend(userId: number, subId: number) {
    await FriendDAO.relationRepo.delete({
      userId: userId,
      subId: subId,
    });
    await FriendDAO.relationRepo.delete({
      userId: subId,
      subId: userId,
    });
  }
}

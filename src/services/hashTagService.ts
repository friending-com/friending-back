import HashTagDAO from '../DAO/HashTagDAO';
import HashTagRelationDAO from '../DAO/HashTagRelationDAO';
import UserDAO from '../DAO/UserDAO';
import ErrorStatus from '../utils/ErrorStatus';

export class HashTagService {
  static async add(hashTagName: string, userId: number) {
    const result = await HashTagDAO.getHashTagId(hashTagName);
    if (result) {
      const relation = await HashTagRelationDAO.searchRelationByHashTagId(
        result
      );
      if (
        relation.some(
          async (data) => data.userId == (await UserDAO.getUser(userId))
        )
      )
        throw new ErrorStatus('이미 해시태그가 등록되어있습니다.', 400);
      await HashTagRelationDAO.addRelation(result, userId);
    } else {
      const hashTagId = await HashTagDAO.createHashTag(hashTagName);
      await HashTagRelationDAO.addRelation(hashTagId, userId);
    }
  }
  static async search(hashTagName: string) {
    const hashTagId = await HashTagDAO.getHashTagId(hashTagName);
    if (!hashTagId) {
      throw new ErrorStatus('해시태그가 없습니다!', 400);
    }
    const result = await HashTagRelationDAO.searchRelationByHashTagId(
      hashTagId
    );
    const userIds = result.map((element) => element.userId);
    const profiles = Promise.all(
      userIds.map(async (userId) => await UserDAO.getProfile(userId.id))
    );
    return profiles;
  }

  static async delete(hashTagName: string, userId: number) {
    const hashTagId = await HashTagDAO.getHashTagId(hashTagName);
    if (!hashTagId) {
      throw new ErrorStatus('해시태그가 없습니다!', 400);
    }
    await HashTagRelationDAO.deleteRelation(userId, hashTagId);
  }
}

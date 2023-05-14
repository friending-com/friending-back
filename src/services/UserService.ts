import HashTagDAO from '../DAO/HashTagDAO';
import HashTagRelationDAO from '../DAO/HashTagRelationDAO';
import UserDAO from '../DAO/UserDAO';
import ErrorStatus from '../utils/ErrorStatus';
export class UserService {
  static async findProfile(id: number) {
    if (!id) {
      throw new ErrorStatus('query없음', 400);
    }

    const user = await UserDAO.getProfile(id);
    const hashTags = await HashTagRelationDAO.searchRelationByUserId(id);
    const hashTagList = await Promise.all(
      hashTags.map(async (hashTag) => {
        return (await HashTagDAO.getHashTagName(hashTag.hashTagId)).hashTag;
      })
    );
    if (user === null) {
      throw new ErrorStatus('user가 존재하지 않습니다.', 400);
    }
    return { ...user, hashTagList };
  }
}

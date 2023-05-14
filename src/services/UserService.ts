import HashTagDAO from '../DAO/HashTagDAO';
import HashTagRelationDAO from '../DAO/HashTagRelationDAO';
import UserDAO from '../DAO/UserDAO';
import { UpdateData } from '../types/signUpData';
import ErrorStatus from '../utils/ErrorStatus';
export class UserService {
  static async find(id: number) {
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
  static async update(updateData: UpdateData) {
    const result = await UserDAO.getProfile(updateData.id);
    if (result) {
      await UserDAO.update(updateData);
    } else {
      throw new ErrorStatus('user가 존재하지 않습니다.', 400);
    }
  }
}

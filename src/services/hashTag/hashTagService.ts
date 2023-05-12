import HashTagDAO from '../../DAO/HashTagDAO';
import HashTagRelationDAO from '../../DAO/HashTagRelationDAO';
import UserDAO from '../../DAO/UserDAO';
import ErrorStatus from '../../utils/ErrorStatus';

export const hashTagAddService = async (
  hashTagName: string,
  userId: number
) => {
  const result = await HashTagDAO.getHashTagId(hashTagName);
  if (result) {
    let flag = false;
    const relationArray = await HashTagRelationDAO.searchRelationByHashTagId(
      result
    );
    relationArray.forEach((relation) => {
      if (relation.userId == userId) flag = true;
    });
    if (flag) return;
    await HashTagRelationDAO.addRelation(result, userId);
  } else {
    const hashTagId = await HashTagDAO.createHashTag(hashTagName);
    await HashTagRelationDAO.addRelation(hashTagId, userId);
  }
};

export const hashTagSearchService = async (hashTagName: string) => {
  const hashTagId = await HashTagDAO.getHashTagId(hashTagName);
  if (!hashTagId) {
    throw new ErrorStatus('해시태그가 없습니다!', 400);
  }
  const result = await HashTagRelationDAO.searchRelationByHashTagId(hashTagId);
  const userIds = result.map((element) => element.userId);
  const profiles = Promise.all(
    userIds.map(async (userId) => await UserDAO.getProfile(userId))
  );
  return profiles;
};

import HashTagDAO from '../../DAO/HashTagDAO';
import HashTagRelationDAO from '../../DAO/HashTagRelationDAO';
import UserDAO from '../../DAO/UserDAO';

export const hashTagAddService = async (
  hashTagName: string,
  userId: number
) => {
  const result = await HashTagDAO.getHashTagId(hashTagName);
  if (result) {
    await HashTagRelationDAO.addRelation(result, userId);
  } else {
    const hashTagId = await HashTagDAO.addHashTag(hashTagName);
    await HashTagRelationDAO.addRelation(hashTagId, userId);
  }
};

export const hashTagSearchService = async (hashTagName: string) => {
  const hashTagId = await HashTagDAO.getHashTagId(hashTagName);
  const result = await HashTagRelationDAO.searchRelationByHashTagId(hashTagId);
  const userIds = result.map((element) => element.userId);
  const profiles = Promise.all(
    userIds.map(async (userId) => await UserDAO.getProfile(userId))
  );
  return profiles;
};

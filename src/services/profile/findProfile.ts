import HashTagDAO from '../../DAO/HashTagDAO';
import HashTagRelationDAO from '../../DAO/HashTagRelationDAO';
import UserDAO from '../../DAO/UserDAO';

export const findProfile = async (id: number) => {
  if (!id) {
    throw new Error('query없음');
  }

  const user = await UserDAO.getProfile(id);
  const hashTags = await HashTagRelationDAO.searchRelationByUserId(id);
  const hashTagList = await Promise.all(
    hashTags.map(async (hashTag) => {
      return (await HashTagDAO.getHashTagName(hashTag.hashTagId)).hashTag;
    })
  );
  if (user === null) {
    throw new Error('user가 존재하지 않습니다.');
  }
  return { ...user, hashTagList };
};

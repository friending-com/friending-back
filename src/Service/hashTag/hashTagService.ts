import { addHashTag } from '../../DAO/hashTag/addHashTag';
import { getHashTagId } from '../../DAO/hashTag/getHashTagId';
import { addRelation } from '../../DAO/hashTagUser/addRelation';
import { searchRelation } from '../../DAO/hashTagUser/searchRelation';
import getProfile from '../../DAO/user/getProfile';

export const hashTagAddService = async (
  hashTagName: string,
  userId: number
) => {
  const result = await getHashTagId(hashTagName);
  if (result) {
    await addRelation(result, userId);
  } else {
    const hashTagId = await addHashTag(hashTagName);
    await addRelation(hashTagId, userId);
  }
};

export const hashTagSearchService = async (hashTagName: string) => {
  const hashTagId = await getHashTagId(hashTagName);
  const result = await searchRelation(hashTagId);
  const userIds = result.map((element) => element.userId);
  const profiles = Promise.all(
    userIds.map(async (userId) => await getProfile(userId))
  );
  return profiles;
};

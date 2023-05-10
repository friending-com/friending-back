import { addHashTag } from '../DAO/friend/addHashTag';
import { addNewHashTag } from '../DAO/hashTag/addNewHashTag';
import { getHashTag } from '../DAO/hashTag/getHashTag';

export const hashTagService = async (hashTagName: string, userId: number) => {
  const result = await getHashTag(hashTagName);
  if (result) {
    await addHashTag(userId, result);
  } else {
    const hashTagId = await addNewHashTag(hashTagName, userId);
    await addHashTag(userId, hashTagId);
  }
};

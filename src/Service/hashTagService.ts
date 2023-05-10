import { addHashTag } from '../DAO/user/addHashTag';
import { addNewHashTag } from '../DAO/hashTag/addNewHashTag';
import { getHashTag } from '../DAO/hashTag/getHashTag';

export const hashTagService = async (hashTagName: string, userId: number) => {
  const result = await getHashTag(hashTagName);
  if (result) {
    await addHashTag(result, userId);
  } else {
    const hashTagId = await addNewHashTag(hashTagName, userId);
    await addHashTag(hashTagId, userId);
  }
};

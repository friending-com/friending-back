import { addHashTag } from '../../DAO/hashTag/addHashTag';
import { getHashTag } from '../../DAO/hashTag/getHashTag';
import { addRelation } from '../../DAO/hashTagUser/addRelation';

export const hashTagAddService = async (
  hashTagName: string,
  userId: number
) => {
  const result = await getHashTag(hashTagName);
  if (result) {
    await addRelation(result, userId);
  } else {
    const hashTagId = await addHashTag(hashTagName);
    await addRelation(hashTagId, userId);
  }
};

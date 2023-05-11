import { addHashTag } from '../../DAO/hashTag/addHashTag';
import { getHashTagId } from '../../DAO/hashTag/getHashTagId';
import { addRelation } from '../../DAO/hashTagUser/addRelation';

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
};

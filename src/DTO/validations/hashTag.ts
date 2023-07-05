import { Request } from 'express';
import { HashTagDeleteDTO, HashTagGetDTO, HashTagPostDTO } from '../HashTagDTO';
import { validation } from '.';
import { token } from '../../utils/auth';

export const hashTagPostValidation = async (req: Request) => {
  const { hashTagName, profileId } = req.body;
  const userId = token(req.headers.authorization);
  const hashTagChecker = new HashTagPostDTO();
  hashTagChecker.hashTagName = hashTagName;
  hashTagChecker.profileId = profileId;
  hashTagChecker.userId = userId;
  await validation(hashTagChecker);
  return { hashTagName, profileId, userId };
};

export const hashTagGetValidation = async (req: Request) => {
  const hashTagName = String(req.query.hashTagName);
  const hashTagChecker = new HashTagGetDTO();
  hashTagChecker.hashTagName = hashTagName;
  await validation(hashTagChecker);
  return hashTagName;
};

export const hashTagDeleteValidation = async (req: Request) => {
  const hashTagName = String(req.query.hashTagName);
  const profileId = Number(req.query.profileId);
  const userId = token(req.headers.authorization);
  const hashTagChecker = new HashTagDeleteDTO();
  hashTagChecker.hashTagName = hashTagName;
  hashTagChecker.profileId = profileId;
  hashTagChecker.userId = userId;
  await validation(hashTagChecker);
  return { hashTagName, profileId, userId };
};

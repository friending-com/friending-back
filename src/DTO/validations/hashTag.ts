import { Request } from 'express';
import { HashTagDeleteDTO, HashTagGetDTO, HashTagPostDTO } from '../HashTagDTO';
import { validation } from '.';

export const hashTagPostValidation = async (req: Request) => {
  const { hashTagName, profileId } = req.body;
  const hashTagChecker = new HashTagPostDTO();
  hashTagChecker.hashTagName = hashTagName;
  hashTagChecker.profileId = profileId;
  await validation(hashTagChecker);
  return { hashTagName, profileId };
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
  const hashTagChecker = new HashTagDeleteDTO();
  hashTagChecker.hashTagName = hashTagName;
  hashTagChecker.profileId = profileId;
  await validation(hashTagChecker);
  return { hashTagName, profileId };
};

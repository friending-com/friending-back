import { Request } from 'express';
import { FriendAddDTO, FriendGetAllDTO, FriendGetDTO } from '../FriendDTO';
import { validation } from '.';
import { token } from '../../utils/auth';

export const friendAddValidation = async (req: Request) => {
  const friendAdd = new FriendAddDTO();
  friendAdd.userProfileId = req.body.userProfileId;
  friendAdd.subProfileId = req.body.subProfileId;
  const userProfileId = req.body.userId;
  const subProfileId = req.body.subId;
  await validation(friendAdd);
  return { userProfileId, subProfileId };
};

export const friendGetAllValidation = async (req: Request) => {
  const userId = token(req.headers.authorization);
  const IdChecker = new FriendGetAllDTO();
  IdChecker.userId = userId;
  await validation(IdChecker);
  return userId;
};

export const friendGetValidation = async (req: Request) => {
  const profileId = req.query.id as unknown as number;
  const IdChecker = new FriendGetDTO();
  IdChecker.profileId = profileId;
  await validation(IdChecker);
  return profileId;
};

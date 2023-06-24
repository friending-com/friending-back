import { Request } from 'express';
import { FriendAddDTO, FriendGetAllDTO } from '../FriendDTO';
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
  const userProfileId = token(req.headers.authorization);
  const IdChecker = new FriendGetAllDTO();
  IdChecker.userProfileId = userProfileId;
  await validation(IdChecker);
  return userProfileId;
};

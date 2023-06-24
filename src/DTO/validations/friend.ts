import { Request } from 'express';
import { FriendAddDTO, FriendGetAllDTO } from '../FriendDTO';
import { validation } from '.';
import { token } from '../../utils/auth';

export const friendAddValidation = async (req: Request) => {
  const friendAdd = new FriendAddDTO();
  friendAdd.userId = req.body.userId;
  friendAdd.subId = req.body.subId;
  const userId = req.body.userId;
  const subId = req.body.subId;
  await validation(friendAdd);
  return { userId, subId };
};

export const friendGetAllValidation = async (req: Request) => {
  const userId = token(req.headers.authorization);
  const IdChecker = new FriendGetAllDTO();
  IdChecker.userId = userId;
  await validation(IdChecker);
  return userId;
};

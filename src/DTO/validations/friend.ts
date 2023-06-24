import { Request } from 'express';
import { FriendAddDTO } from '../FriendDTO';
import { validation } from '.';

export const frinedAddValidation = async (req: Request) => {
  const friendAdd = new FriendAddDTO();
  friendAdd.userId = req.body.userId;
  friendAdd.subId = req.body.subId;
  const userId = req.body.userId;
  const subId = req.body.subId;
  await validation(friendAdd);
  return { userId, subId };
};

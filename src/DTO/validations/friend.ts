import { Request } from 'express';
import {
  FriendAddDTO,
  FriendDeleteDTO,
  FriendGetAllDTO,
  FriendGetDTO,
} from '../FriendDTO';
import { validation } from '.';
import { token } from '../../utils/auth';

export const friendAddValidation = async (req: Request) => {
  const friendAdd = new FriendAddDTO();
  friendAdd.userProfileId = req.body.userProfileId;
  friendAdd.subProfileId = req.body.subProfileId;
  const userProfileId = req.body.userProfileId;
  const subProfileId = req.body.subProfileId;
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
  const profileId = Number(req.query.id);
  const IdChecker = new FriendGetDTO();
  IdChecker.profileId = profileId;
  await validation(IdChecker);
  return profileId;
};

export const firendDeleteValidation = async (req: Request) => {
  const userProfileId = Number(req.query.userProfileId);
  const subProfileId = Number(req.query.subProfileId);
  const IdChecker = new FriendDeleteDTO();
  IdChecker.userProfieId = userProfileId;
  IdChecker.subProfileId = subProfileId;
  await validation(IdChecker);
  return { userProfileId, subProfileId };
};

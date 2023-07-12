import { Request } from 'express';
import {
  FriendAddDTO,
  FriendDeleteDTO,
  FriendGetAllDTO,
  FriendGetDTO,
} from '../FriendDTO';
import { validation } from '.';
import { JWTService } from '../../services/JWTService';

export const friendAddValidation = async (req: Request) => {
  const friendAdd = new FriendAddDTO();
  friendAdd.userProfileId = req.body.userProfileId;
  friendAdd.subProfileId = req.body.subProfileId;
  const userId = await JWTService.verify(req.headers.authorization);
  friendAdd.userId = Number(userId.id);
  const userProfileId = req.body.userProfileId;
  const subProfileId = req.body.subProfileId;
  await validation(friendAdd);
  return { userProfileId, subProfileId, userId: userId.id };
};

export const friendGetAllValidation = async (req: Request) => {
  const userId = await JWTService.verify(req.headers.authorization);
  const IdChecker = new FriendGetAllDTO();
  IdChecker.userId = Number(userId.id);
  await validation(IdChecker);
  return userId.id;
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
  const userId = await JWTService.verify(req.headers.authorization);
  const IdChecker = new FriendDeleteDTO();
  IdChecker.userProfieId = userProfileId;
  IdChecker.subProfileId = subProfileId;
  IdChecker.userId = Number(userId.id);
  await validation(IdChecker);
  return { userProfileId, subProfileId, userId: userId.id };
};

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
  const friendAddDTO = new FriendAddDTO();
  friendAddDTO.userProfileId = req.body.userProfileId;
  friendAddDTO.subProfileId = req.body.subProfileId;
  const userId = await JWTService.verify(req.headers.authorization);
  friendAddDTO.userId = Number(userId.id);
  await validation(friendAddDTO);
  return friendAddDTO;
};

export const friendGetAllValidation = async (req: Request) => {
  const userId = await JWTService.verify(req.headers.authorization);
  const friendGetAllDTO = new FriendGetAllDTO();
  friendGetAllDTO.userId = Number(userId.id);
  await validation(friendGetAllDTO);
  return friendGetAllDTO;
};

export const friendGetValidation = async (req: Request) => {
  const profileId = Number(req.query.id);
  const friendGetDTO = new FriendGetDTO();
  friendGetDTO.profileId = profileId;
  await validation(friendGetDTO);
  return friendGetDTO;
};

export const firendDeleteValidation = async (req: Request) => {
  const userProfileId = Number(req.query.userProfileId);
  const subProfileId = Number(req.query.subProfileId);
  const userId = await JWTService.verify(req.headers.authorization);
  const friendDeleteDTO = new FriendDeleteDTO();
  friendDeleteDTO.userProfileId = userProfileId;
  friendDeleteDTO.subProfileId = subProfileId;
  friendDeleteDTO.userId = Number(userId.id);
  await validation(friendDeleteDTO);
  return friendDeleteDTO;
};

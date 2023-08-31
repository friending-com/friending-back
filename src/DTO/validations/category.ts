import { Request } from 'express';
import {
  CategoryAddDTO,
  CategoryDTO,
  CategoryFriendAddDTO,
  CategoryGetAllDTO,
} from '../CategoryDTO';
import { JWTService } from '../../services/JWTService';
import { validation } from '.';

export const categoryGetValidation = async (req: Request) => {
  const validator = new CategoryDTO();
  const { id } = await JWTService.verify(req.headers.authorization);
  validator.userId = id;
  const categoryId = Number(req.params.categoryId);
  validator.categoryId = categoryId;
  await validation(validator);
  return { categoryId };
};

export const categoryGetAllValidation = async (req: Request) => {
  const validator = new CategoryGetAllDTO();
  const { id } = await JWTService.verify(req.headers.authorization);
  validator.userId = id;
  await validation(validator);
  return { id };
};

export const categoryMakeValidation = async (req: Request) => {
  const validator = new CategoryAddDTO();
  const { id } = await JWTService.verify(req.headers.authorization);
  validator.userId = id;
  validator.name = req.body.name;
  await validation(validator);
  return { id, name: req.body.name };
};

export const categoryFriendAddValidation = async (req: Request) => {
  const validator = new CategoryFriendAddDTO();
  const { id } = await JWTService.verify(req.headers.authorization);
  validator.userId = id;
  const categoryId = req.body.categoryId;
  const profileId = req.body.profileId;
  validator.categoryId = categoryId;
  validator.friendProfileId = profileId;
  await validation(validator);
  return { id, categoryId, profileId };
};

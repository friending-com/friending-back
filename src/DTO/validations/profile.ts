import { Request } from 'express';
import { ProfileCreateData, UpdateData } from '../../types/profileData';
import {
  ProfileCreateDTO,
  ProfileGetAllDTO,
  ProfileGetDTO,
  ProfileModifyDTO,
} from '../ProfileDTO';
import { validation } from '.';
import { JWTService } from '../../services/JWTService';
export const getAllProfileValidation = async (req: Request) => {
  const userId = await JWTService.verify(req.headers.authorization);
  const IdChecker = new ProfileGetAllDTO();
  IdChecker.userId = userId.id;
  await validation(IdChecker);
  return userId.id;
};
export const getProfileValidation = async (req: Request) => {
  const userId = await JWTService.verify(req.headers.authorization);
  const id = Number(req.params.id);
  const IdChecker = new ProfileGetDTO();
  IdChecker.id = id;
  IdChecker.userId = userId.id;
  await validation(IdChecker);
  return { userId: userId.id, id };
};
export const createProfileValidation = async (req: Request) => {
  const profileData: ProfileCreateData = {
    userId: (await JWTService.verify(req.headers.authorization)).id,
    isMain: req.body.isMain,
    discord: req.body.discord,
    line: req.body.line,
    naverBlog: req.body.naverBlog,
    naverBand: req.body.naverBand,
    telegram: req.body.telegram,
    instagram: req.body.instagram,
    twitter: req.body.twitter,
    phone: req.body.phone,
    facebook: req.body.facebook,
    kakaoTalk: req.body.kakaoTalk,
    isPublic: req.body.isPublic,
  };
  const profile = new ProfileCreateDTO();
  Object.entries(profileData).forEach(([key, value]) => {
    profile[key] = value;
  });
  await validation(profile);
  return profileData;
};
export const modifyProfileValidation = async (req: Request) => {
  const profileData: UpdateData = {
    userId: (await JWTService.verify(req.headers.authorization)).id,
    id: parseInt(req.params.id),
    discord: req.body.discord,
    line: req.body.line,
    naverBlog: req.body.naverBlog,
    naverBand: req.body.naverBand,
    telegram: req.body.telegram,
    instagram: req.body.instagram,
    twitter: req.body.twitter,
    phone: req.body.phone,
    facebook: req.body.facebook,
    kakaoTalk: req.body.kakaoTalk,
  };
  const modifyProfile = new ProfileModifyDTO();
  Object.entries(profileData).forEach(([key, value]) => {
    modifyProfile[key] = value;
  });
  await validation(modifyProfile);
  return modifyProfile;
};

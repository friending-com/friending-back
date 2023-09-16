import { Request } from 'express';
import { ProfileCreateData, UpdateData } from '../../types/profileData';
import {
  ProfileCreateDTO,
  ProfileDeleteDTO,
  ProfileGetAllDTO,
  ProfileGetDTO,
  ProfileModifyDTO,
} from '../ProfileDTO';
import { validation } from '.';
import { JWTService } from '../../services/JWTService';
export const getAllProfileValidation = async (req: Request) => {
  const userId = await JWTService.verify(req.headers.authorization);
  const IdChecker = new ProfileGetAllDTO();
  IdChecker.userId = Number(userId.id);
  await validation(IdChecker);
  return userId.id;
};
export const getProfileValidation = async (req: Request) => {
  const id = Number(req.params.id);
  const IdChecker = new ProfileGetDTO();
  IdChecker.id = id;
  await validation(IdChecker);
  return id;
};
export const createProfileValidation = async (req: Request) => {
  const profileData: ProfileCreateData = {
    userId: Number((await JWTService.verify(req.headers.authorization)).id),
    email: req.body.email,
    nickName: req.body.nickName,
    name: req.body.name,
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
    workSpace: req.body.workSpace,
    hashTags: req.body.hashTags,
    thread: req.body.thread,
    image: req.body.image,
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
    userId: Number((await JWTService.verify(req.headers.authorization)).id),
    id: parseInt(req.params.id),
    name: req.body.name,
    nickName: req.body.nickName,
    email: req.body.email,
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
    workSpace: req.body.workSpace,
    hashTags: req.body.hashTags,
    thread: req.body.thread,
    image: req.body.image,
  };
  const modifyProfile = new ProfileModifyDTO();
  Object.entries(profileData).forEach(([key, value]) => {
    modifyProfile[key] = value;
  });
  await validation(modifyProfile);
  return modifyProfile;
};

export const deleteProfileValidation = async (req: Request) => {
  const deleteDTO = new ProfileDeleteDTO();
  const decoded = await JWTService.verify(req.headers.authorization);
  deleteDTO.id = decoded.id;
  const profileId = Number(req.params.id);
  deleteDTO.proifleId = profileId;
  await validation(deleteDTO);
  return profileId;
};

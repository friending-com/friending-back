import { Request } from 'express';
import { ProfileCreateData, UpdateData } from '../../types/profileData';
import { ProfileCreateDTO, ProfileModifyDTO } from '../ProfileDTO';
import { validate } from 'class-validator';
import { validation } from '.';
import { token } from '../../utils/auth';

export const createProfileValidation = async (req: Request) => {
  const profileData: ProfileCreateData = {
    userId: token(req.headers.authorization),
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
    userId: token(req.headers.authorization),
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

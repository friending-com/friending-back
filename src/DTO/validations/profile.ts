import { Request } from 'express';
import { ProfileCreateData } from '../../types/profileData';
import { ProfileCreateDTO } from '../ProfileDTO';
import { validate } from 'class-validator';
import { validation } from '.';

export const createProfileValidation = async (req: Request) => {
  const profileData: ProfileCreateData = {
    userId: req.body.userId,
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

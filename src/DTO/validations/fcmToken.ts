import { Request } from 'express';
import { FCMTokenDTO } from '../FCMTokenDTO';
import { JWTService } from '../../services/JWTService';
import { validation } from '.';

export const fcmTokenValidation = async (req: Request) => {
  const fcmTokenDTO = new FCMTokenDTO();
  const { id } = await JWTService.verify(req.headers.authorization);
  fcmTokenDTO.id = id;
  fcmTokenDTO.token = req.body.token;
  await validation(fcmTokenDTO);
  return fcmTokenDTO;
};

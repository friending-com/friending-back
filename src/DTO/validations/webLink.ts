import { Request } from 'express';
import { WebLinkDTO } from '../WebLinkDTO';
import { validation } from '.';
import { JWTService } from '../../services/JWTService';

export const webLinkValidation = async (req: Request) => {
  const dto = new WebLinkDTO();
  const token = req.headers.authorization;
  await JWTService.verify(token);
  dto.id = Number(req.query.id);
  await validation(dto);
  return dto;
};

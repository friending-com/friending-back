import { Request } from 'express';
import { CallBackPostDTO } from '../CallbackDTO';
import { validation } from '.';

export const callbackValidation = async (req: Request) => {
  const dto = new CallBackPostDTO();
  dto.accessToken = req.body.accessToken;
  dto.platform = req.body.platform;
  await validation(dto);
  return dto;
};

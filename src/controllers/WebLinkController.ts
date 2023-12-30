import { Request, Response } from 'express';
import { webLinkValidation } from '../DTO/validations/webLink';
import { WebLinkService } from '../services/WebLinkService';
import { JWTService } from '../services/JWTService';
import ProfileDAO from '../DAO/ProfileDAO';

export class WebLinkController {
  static async get(req: Request, res: Response) {
    const webLinkDTO = await webLinkValidation(req);
    const linkToken = await WebLinkService.createLink(webLinkDTO);
    res.json(`http://friending.online/profile?token=${linkToken}`);
  }

  static async post(req: Request, res: Response) {
    const token = req.body.token;
    const { id } = await JWTService.verifyLinkToken(token);
    const result = await ProfileDAO.getProfile(id);
    res.json(result);
  }
}

import { WebLinkDTO } from '../DTO/WebLinkDTO';
import { JWTService } from './JWTService';

export class WebLinkService {
  static async createLink(dto: WebLinkDTO) {
    const linkToken = await JWTService.issueLinkToken(dto.id);
    return linkToken;
  }
}

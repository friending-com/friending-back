import UserDAO from '../DAO/UserDAO';
import { GoogleProfile } from '../types/socialProfile';
import { JWTService } from './JWTService';

export class LoginService {
  static async googleLogin(data: GoogleProfile) {
    const user = await UserDAO.getUserByEmail(data.email);
    if (user) {
      return await JWTService.issue(user.id);
    } else {
      const newuser = await UserDAO.makeNewUser(data.email);
      return await JWTService.issue(newuser.id);
    }
  }
}

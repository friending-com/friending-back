import UserDAO from '../DAO/UserDAO';
import { SignUpData, UpdateData } from '../types/profileData';
export class UserService {
  static async signup(data: SignUpData) {
    await UserDAO.signup(data);
  }

  static async findAllProfile(id: number) {
    return (await UserDAO.getUserProfiles(id)).profiles;
  }

  static async update(updateData: UpdateData) {
    await UserDAO.update(updateData);
  }
}

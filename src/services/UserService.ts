import UserDAO from '../DAO/UserDAO';
import { SignUpData, UpdateData } from '../types/profileData';
export class UserService {
  static async signup(data: SignUpData) {
    await UserDAO.signup(data);
  }

  static async find(id: number) {
    return await UserDAO.getUser(id);
  }

  static async update(updateData: UpdateData) {
    await UserDAO.update(updateData);
  }
}

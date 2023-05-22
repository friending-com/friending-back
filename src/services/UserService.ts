import UserDAO from '../DAO/UserDAO';
import { SignUpData, UpdateData } from '../types/signUpData';
export class UserService {
  static async signup(data: SignUpData) {
    await UserDAO.signup(data);
  }

  static async find(id: number) {
    return await UserDAO.getProfile(id);
  }

  static async update(updateData: UpdateData) {}
}

import UserDAO from '../DAO/UserDAO';
import { UpdateData } from '../types/profileData';
export class UserService {
  static async findAllProfile(id: number) {
    return (await UserDAO.getUserProfiles(id)).profiles;
  }

  static async update(updateData: UpdateData) {
    await UserDAO.update(updateData);
  }
}

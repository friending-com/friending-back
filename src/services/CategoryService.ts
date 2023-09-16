import UserDAO from '../DAO/UserDAO';
import { AppDataSource } from '../DAO/data-source';
import { Category } from '../entity/Category';
import { Profile } from '../entity/Profile';
import { User } from '../entity/User';
import ErrorStatus from '../utils/ErrorStatus';

export class CategoryService {
  static repo = AppDataSource.getRepository(Category);

  static async getAllCategory(userId: number) {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: userId },
    });
    return await CategoryService.repo.findOne({ where: { user: user } });
  }

  static async getCategory(id: number) {
    const category = await CategoryService.repo.findOne({
      where: { id },
      relations: {
        friends: true,
      },
    });
    const result = { name: category.name, friends: category.friends };
    return result;
  }

  static async addFriendCategory(friendProfileId: number, id: number) {
    const friendProfile = await AppDataSource.getRepository(Profile).findOne({
      where: { id: friendProfileId },
    });
    const category = await CategoryService.repo.findOne({ where: { id } });
    category.friends.push(friendProfile);
    await CategoryService.repo.save(category);
  }

  static async removeFriendCategory(friendProfileId: number, id: number) {
    const friendProfile = await AppDataSource.getRepository(Profile).findOne({
      where: { id: friendProfileId },
    });
    const category = await CategoryService.repo.findOne({ where: { id } });
    category.friends.filter((each) => each != friendProfile);
    await CategoryService.repo.save(category);
  }

  static async makeCategory(userId: number, name: string) {
    const category = new Category();
    category.name = name;
    category.user = await UserDAO.getUser(userId);
    return await CategoryService.repo.save(category);
  }

  static async removeCategory(userId: number, categoryId: number) {
    const category = CategoryService.repo.findOne({
      where: { user: await UserDAO.getUser(userId) },
    });
    if (category) {
      return await CategoryService.repo.delete(categoryId);
    }
    throw new ErrorStatus('권한이 없습니다.', 401);
  }
}

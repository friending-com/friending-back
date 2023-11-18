import { Group } from '../entity/Group';
import { User } from '../entity/User';
import { AppDataSource } from './data-source';

export class GroupDAO {
  static groupRepo = AppDataSource.getRepository(Group);
  static userRepo = AppDataSource.getRepository(User);

  static async getGroup(id: number) {
    return await GroupDAO.groupRepo.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  static async addGroup(user: User) {
    const group = new Group();
    group.user.push(user);
    return await GroupDAO.groupRepo.save(group);
  }

  static async mergeGroup(group1Id: number, group2Id: number) {
    const group1 = await GroupDAO.getGroup(group1Id);
    const group2 = await GroupDAO.getGroup(group2Id);
    if (group1.id === group2.id) return;

    if (group1.user.length > group2.user.length) {
      for (const user of group2.user) {
        user.group = group1;
        await GroupDAO.userRepo.save(user);
        group1.user.push(user);
      }
      await GroupDAO.groupRepo.remove(group2);
    } else {
      for (const user of group1.user) {
        user.group = group2;
        await GroupDAO.userRepo.save(user);
        group2.user.push(user);
      }
      await GroupDAO.groupRepo.remove(group1);
    }
  }
}

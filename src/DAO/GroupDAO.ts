import { Group } from '../entity/Group';
import { Profile } from '../entity/Profile';
import { AppDataSource } from './data-source';

export class GroupDAO {
  static groupRepo = AppDataSource.getRepository(Group);
  static profileRepo = AppDataSource.getRepository(Profile);

  static async getGroup(id: number) {
    return await GroupDAO.groupRepo.findOne({
      where: { id },
      relations: { profiles: true },
    });
  }

  static async mergeGroup(id1: number, id2: number) {
    const group1 = await GroupDAO.getGroup(id1);
    const group2 = await GroupDAO.getGroup(id2);

    if (group1.profiles.length > group2.profiles.length) {
      for (const profile of group2.profiles) {
        profile.group = group1;
        await GroupDAO.profileRepo.save(profile);
        group1.profiles.push(profile);
      }
      await GroupDAO.groupRepo.remove(group2);
    } else {
      for (const profile of group1.profiles) {
        profile.group = group2;
        await GroupDAO.profileRepo.save(profile);
        group2.profiles.push(profile);
      }
      await GroupDAO.groupRepo.remove(group1);
    }
  }
}

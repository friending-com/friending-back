import HashTagDAO from '../DAO/HashTagDAO';
import ProfileDAO from '../DAO/ProfileDAO';

export class WorkSpaceService {
  static async add(workSpaceName: string, profileId: number) {
    let hashTag = await HashTagDAO.getHashTagProfile(workSpaceName);
    if (!hashTag) {
      hashTag = await HashTagDAO.createHashTag(workSpaceName);
    }
    hashTag = await HashTagDAO.getHashTagProfile(workSpaceName);
    const profile = await ProfileDAO.getProfileWorkSpace(profileId);
    profile.workSpace = hashTag;
    hashTag.profiles.push(profile);
    await ProfileDAO.save(profile);
    await HashTagDAO.save(hashTag);
  }
  static async delete(workSpace: string, profileId: number) {
    await HashTagDAO.deleteHashTagProfile(workSpace, profileId);
  }
}

import HashTagDAO from '../DAO/HashTagDAO';
import ProfileDAO from '../DAO/ProfileDAO';
import ErrorStatus from '../utils/ErrorStatus';

export class HashTagService {
  static async add(hashTagName: string, profileId: number) {
    let hashTag = await HashTagDAO.getHashTag(hashTagName);
    if (!hashTag) {
      hashTag = await HashTagDAO.createHashTag(hashTagName);
    }
    const profile = await ProfileDAO.getProfile(profileId);
    profile.hashTags.push(hashTag);
    hashTag.profiles.push(profile);
    await ProfileDAO.save(profile);
    await HashTagDAO.save(hashTag);
  }
  static async search(hashTagName: string) {
    try {
      const profileList = (await HashTagDAO.getHashTag(hashTagName)).profiles;
      return profileList.filter((profile) => profile.isPublic === true);
    } catch (err) {
      return [];
    }
  }

  static async delete(hashTagName: string, userId: number) {}
}

import HashTagDAO from '../DAO/HashTagDAO';
import ProfileDAO from '../DAO/ProfileDAO';
import ErrorStatus from '../utils/ErrorStatus';

export class HashTagService {
  static async add(hashTagName: string, profileId: number) {
    let hashTag = await HashTagDAO.getHashTagProfile(hashTagName);
    if (!hashTag) {
      hashTag = await HashTagDAO.createHashTag(hashTagName);
    }
    hashTag = await HashTagDAO.getHashTagProfile(hashTagName);
    const profile = await ProfileDAO.getProfile(profileId);
    if (profile.hashTags.some((hT) => hT.id == hashTag.id)) {
      return;
    }
    if (hashTag.profiles.some((pf) => pf.id == profile.id)) {
      return;
    }
    profile.hashTags.push(hashTag);
    hashTag.profiles.push(profile);
    await ProfileDAO.save(profile);
    await HashTagDAO.save(hashTag);
  }

  static async search(hashTagName: string) {
    try {
      console.log(hashTagName);
      const profileList = (await HashTagDAO.getHashTagProfile(hashTagName))
        .profiles;

      return profileList.filter((profile) => profile.isPublic === true);
    } catch (err) {
      return [];
    }
  }

  static async delete(hashTagName: string, profileId: number) {
    await HashTagDAO.deleteHashTagProfile(hashTagName, profileId);
  }
}

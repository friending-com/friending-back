import HashTagDAO from '../DAO/HashTagDAO';
import UserDAO from '../DAO/UserDAO';

export class SearchService {
  static async getSearchResult(searchQuery: string) {
    const hashTagResult = (await HashTagDAO.getHashTag(searchQuery)).hashTag; //해당 해시태그가 있는지 확인

    const userData = await UserDAO.getUserProfilesByName(searchQuery);
    const userProfiles = userData
      ? userData.profiles.filter((profile) => profile.isPublic === true)
      : [];

    return {
      hashTag: hashTagResult,
      profiles: userProfiles,
    };
  }
}

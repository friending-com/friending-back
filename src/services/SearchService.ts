import HashTagDAO from '../DAO/HashTagDAO';
import UserDAO from '../DAO/UserDAO';

export class SearchService {
  static async getSearchResult(searchQuery: string) {
    const hashTagResult = await HashTagDAO.getHashTagAutoMatching(searchQuery);

    const userData = await UserDAO.getUserProfilesByName(searchQuery);
    const userProfiles = userData
      ? userData.profiles.filter((profile) => profile.isPublic === true)
      : [];

    return {
      hashTag: hashTagResult.map((hashTag) => hashTag.hashTag),
      profiles: userProfiles,
    };
  }
}

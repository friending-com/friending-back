import HashTagDAO from '../DAO/HashTagDAO';
import UserDAO from '../DAO/UserDAO';

export class SearchService {
  static async getSearchResult(searchQuery: string) {
    const hashTagResult = await HashTagDAO.getHashTagAutoMatching(searchQuery);

    const userData = await UserDAO.getUserProfilesByName(searchQuery);
    const userProfiles = userData
      ? userData.profiles.filter((profile) => profile.isPublic === true)
      : [];
    if (userProfiles.length) {
      Object.entries(userData).forEach(([key, value]) => {
        if (key != 'profiles') {
          userProfiles.map((profile) => (profile[key] = value));
        }
      });
    }
    return {
      hashTag: hashTagResult.map((hashTag) => hashTag.hashTag),
      profiles: userProfiles,
    };
  }
}

import HashTagDAO from '../DAO/HashTagDAO';
import ProfileDAO from '../DAO/ProfileDAO';
import UserDAO from '../DAO/UserDAO';

export class SearchService {
  static async getSearchResult(searchQuery: string) {
    const hashTagResult = await HashTagDAO.getHashTagAutoMatching(searchQuery);

    const userData = await ProfileDAO.getProfileByName(searchQuery);

    return {
      hashTag: hashTagResult.map((hashTag) => hashTag.hashTag),
      profiles: userData.map((profile) => {
        return { id: profile.id, name: profile.name };
      }),
    };
  }
}

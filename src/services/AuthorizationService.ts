import ProfileDAO from '../DAO/ProfileDAO';
import UserDAO from '../DAO/UserDAO';

export class AuthorizationService {
  static async doesUserHaveProfile(userId: number, profileId: number) {
    const findProfile = await ProfileDAO.getProfileAndUser(profileId);
    if (findProfile.user.id != userId) return null;
    const result = { ...findProfile };
    delete result.id;
    delete result.user;

    return result;
  }

  static async areTheyFriends(userId: number, profileId: number) {
    const userProfiles = (await UserDAO.getUserProfiles(userId)).profiles;
    const profileIds = userProfiles.map((profile) => profile.id);
    const findProfile = await ProfileDAO.getProfileFriends(profileId);
    for (const id of profileIds) {
      if (findProfile.friends.some((profile) => profile.id === id)) {
        const result = { ...findProfile };
        delete result.id;
        delete result.user;
        delete result.friends;
        return result;
      }
    }
    return null;
  }
}

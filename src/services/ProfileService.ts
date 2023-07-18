import ProfileDAO from '../DAO/ProfileDAO';
import UserDAO from '../DAO/UserDAO';
import { ProfileCreateData, UpdateData } from '../types/profileData';
import ErrorStatus from '../utils/ErrorStatus';
import { AuthorizationService } from './AuthorizationService';
import { WorkSpaceService } from './WorkSpaceService';
import { HashTagService } from './hashTagService';

export default class ProfileService {
  static async getProfile(userId: number, findProfileId: number) {
    //userId의 user가 findProfileId의 프로필을 소유하는지, 친구인지 확인해야함

    //findProfileId의 소유권확인
    const findProfile = await AuthorizationService.doesUserHaveProfile(
      userId,
      findProfileId
    );
    if (findProfile) return findProfile;
    //userId에 해당하는 프로필 중 하나가 findProfile과 친구인지 확인
    const result = await AuthorizationService.areTheyFriends(
      userId,
      findProfileId
    );
    if (result) return result;
    throw new ErrorStatus('권한이 없습니다', 500);
  }
  static async createProfile(profileData: ProfileCreateData) {
    const profile = await ProfileDAO.createProfile(profileData); //프로필을 생성함
    profileData.hashTags.forEach(async (hashTag) => {
      await HashTagService.add(hashTag, profile.id);
    }); //프로필 등록
    await WorkSpaceService.add(profileData.workSpace, profile.id); //workSpace 등록
    const user = await UserDAO.getUserProfiles(profileData.userId); //user의 전체 프로필을 가져옴
    user.profiles.push(profile);
    await UserDAO.save(user);
    return profile;
  }

  static async modifyProfile(profileData: UpdateData) {
    const user = await UserDAO.getUserProfiles(profileData.userId);
    if (!user.profiles.some((profile) => profile.id === profileData.id)) {
      throw new ErrorStatus('프로필 수정권한이 없습니다!', 400);
    }
    await ProfileDAO.modify(profileData);
    if (profileData.workSpace || profileData.hashTags) {
      const profile = await ProfileDAO.getProfile(profileData.id);
      if (profileData.workSpace) {
        await HashTagService.add(profileData.workSpace, profile.id);
      }
      if (profileData.hashTags) {
        profile.hashTags.forEach(async (hashTag) => {
          await HashTagService.delete(hashTag.hashTag, profile.id); //전부 삭제
        });
        profileData.hashTags.forEach(async (hashTag) => {
          console.log(hashTag);
          await HashTagService.add(hashTag, profile.id); //전부 등록
        });
      }
    }
  }

  static async deleteProfile(profileData: number) {
    await ProfileDAO.delete(profileData);
  }
}

import ProfileDAO from '../DAO/ProfileDAO';
import UserDAO from '../DAO/UserDAO';
import { ProfileCreateData, UpdateData } from '../types/profileData';
import ErrorStatus from '../utils/ErrorStatus';
import { AuthorizationService } from './AuthorizationService';
import { WorkSpaceService } from './WorkSpaceService';
import { HashTagService } from './hashTagService';

export default class ProfileService {
  static async getProfile(findProfileId: number) {
    //권한 검사 제거하고, public인 경우 모두가 조회할 수 있도록 변경
    const profile = await ProfileDAO.getProfile(findProfileId);
    if (!profile) throw new ErrorStatus('없는 프로필입니다.', 404);
    if (profile.isPublic) return profile;
    throw new ErrorStatus('권한이 없습니다', 500);
  }

  static async createProfile(profileData: ProfileCreateData) {
    const profile = await ProfileDAO.createProfile(profileData); //프로필을 생성함
    const promises = profileData.hashTags.map((hashTag) =>
      HashTagService.add(hashTag, profile.id)
    ); //프로필 등록
    await Promise.all(promises);
    if (profileData.workSpace)
      await WorkSpaceService.add(profileData.workSpace, profile.id); //workSpace 등록

    const user = await UserDAO.getUserProfilesForEdit(profileData.userId); //user의 전체 프로필을 가져옴
    const hashTagProfile = await ProfileDAO.getProfile(profile.id);
    user.profiles.push(profile);
    await UserDAO.save(user);
    return hashTagProfile;
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
        await WorkSpaceService.add(profileData.workSpace, profile.id);
      }
      if (profileData.hashTags) {
        const previousHashTagList = profile.hashTags.map(
          (hashTag) => hashTag.hashTag
        );
        const currentHashTagList = profileData.hashTags;

        const addedHashTags = currentHashTagList.filter(
          (hashTag) => !previousHashTagList.includes(hashTag)
        );
        const removedHashTags = previousHashTagList.filter(
          (hashTag) => !currentHashTagList.includes(hashTag)
        );

        const deletePromise = removedHashTags.map(
          (hashTag) => HashTagService.delete(hashTag, profile.id) //삭제된 부분 삭제
        );
        await Promise.all(deletePromise);
        const hashTagPromise = addedHashTags.map(
          (hashTag) => HashTagService.add(hashTag, profile.id) //추가된 부분 추가
        );
        await Promise.all(hashTagPromise);
      }
    }
    return await ProfileDAO.getProfile(profileData.id);
  }

  static async deleteProfile(profileData: number) {
    await ProfileDAO.delete(profileData);
  }
}

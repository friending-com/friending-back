import ProfileDAO from '../DAO/ProfileDAO';
import UserDAO from '../DAO/UserDAO';
import {
  ProfileCreateDTO,
  ProfileDeleteDTO,
  ProfileGetDTO,
  ProfileModifyDTO,
} from '../DTO/ProfileDTO';
import ErrorStatus from '../utils/ErrorStatus';
import { WorkSpaceService } from './WorkSpaceService';
import { HashTagService } from './hashTagService';

export default class ProfileService {
  static async getProfile(dto: ProfileGetDTO) {
    //권한 검사 제거하고, public인 경우 모두가 조회할 수 있도록 변경
    const profile = await ProfileDAO.getProfile(dto.id);
    if (!profile) throw new ErrorStatus('없는 프로필입니다.', 404);
    if (profile.isPublic) return profile;
    throw new ErrorStatus('권한이 없습니다', 500);
  }

  static async createProfile(dto: ProfileCreateDTO) {
    const profile = await ProfileDAO.createProfile(dto); //프로필을 생성함

    if (dto.hashTags)
      for (const hashTag of dto.hashTags) {
        await HashTagService.add(hashTag, profile.id);
      }

    if (dto.workSpace) await WorkSpaceService.add(dto.workSpace, profile.id); //workSpace 등록

    const user = await UserDAO.getUserProfilesForEdit(dto.userId); //user의 전체 프로필을 가져옴
    const hashTagProfile = await ProfileDAO.getProfile(profile.id);
    user.profiles.push(profile);
    await UserDAO.save(user);
    return hashTagProfile;
  }

  static async modifyProfile(dto: ProfileModifyDTO) {
    const user = await UserDAO.getUserProfiles(dto.userId);
    if (!user.profiles.some((profile) => profile.id === dto.id)) {
      throw new ErrorStatus('프로필 수정권한이 없습니다!', 400);
    }
    await ProfileDAO.modify(dto);

    if (dto.workSpace || dto.hashTags) {
      const profile = await ProfileDAO.getProfile(dto.id);
      if (dto.workSpace) {
        await WorkSpaceService.add(dto.workSpace, profile.id);
      }
      if (dto.hashTags) {
        const previousHashTagList = profile.hashTags.map(
          (hashTag) => hashTag.hashTag
        );
        const currentHashTagList = dto.hashTags;

        const addedHashTags = currentHashTagList.filter(
          (hashTag) => !previousHashTagList.includes(hashTag)
        );
        const removedHashTags = previousHashTagList.filter(
          (hashTag) => !currentHashTagList.includes(hashTag)
        );

        for (const hashTag of removedHashTags) {
          await HashTagService.delete(hashTag, profile.id); //삭제된 부분 삭제
        }
        for (const hashTag of addedHashTags) {
          await HashTagService.add(hashTag, profile.id); //추가된 부분 추가
        }
      }
    }
    return await ProfileDAO.getProfile(dto.id);
  }

  static async deleteProfile(dto: ProfileDeleteDTO) {
    await ProfileDAO.delete(dto.profileId);
  }

  static async getUser(profileId: number) {
    const profile = await ProfileDAO.getProfileAndUser(profileId);
    if (!profile) throw new ErrorStatus('존재하지 않는 프로필입니다.', 400);
    return profile.user.id;
  }
}

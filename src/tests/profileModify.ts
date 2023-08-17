import { ProfileCreateData, UpdateData } from '../types/profileData';
import ProfileService from '../services/ProfileService';
import dotenv from 'dotenv';
import { AppDataSource } from '../DAO/data-source';
import { LoginService } from '../services/LoginService';
beforeAll(async () => {
  dotenv.config();
  try {
    await AppDataSource.initialize();
    await LoginService.login({
      email: 'rlfehd2013@naver.com',
      name: 'gildong',
      picture: '1',
    });
  } catch (err) {
    console.log(err);
  }
});
afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Profile Modify Test', () => {
  const noWorkSpace = {
    name: '길동',
    isPublic: true,
    hashTags: ['중앙대학교'],
    email: 'rlfehd2013@naver.com',
    userId: 1,
  };
  const normalData = {
    name: '길동',
    isPublic: true,
    hashTags: ['중앙대학교'],
    email: 'rlfehd2013@naver.com',
    userId: 1,
    workSpace: '프렌딩',
  };
  const normalModifyData: UpdateData = {
    id: 1,
    name: '동길',
    isPublic: true,
    email: 'dlehdrlf09@naver.com',
    userId: 1,
  };

  const hashTagModifyData: UpdateData = {
    id: 1,
    name: '길동',
    isPublic: true,
    hashTags: ['중앙대', '멋쟁이사자처럼11기'],
    email: 'dlehdrlf09@naver.com',
    userId: 1,
  };

  const hashTagNumbers = {
    name: '길동',
    isPublic: true,
    hashTags: ['1'],
    email: 'rlfehd2013@naver.com',
    userId: 1,
    workSpace: '프렌딩',
  };
  const hashTagNumbersModify: UpdateData = {
    id: 1,
    name: '길동',
    isPublic: true,
    hashTags: ['1', '2', '3'],
    email: 'rlfehd2013@naver.com',
    userId: 1,
    workSpace: '프렌딩',
  };

  it('Change normal property', async () => {
    const profile = await ProfileService.createProfile(
      normalData as ProfileCreateData
    );
    normalModifyData.id = profile.id;
    const result = await ProfileService.modifyProfile(normalModifyData);
    expect(result.name).toBe('동길');
    expect(result.email).toBe('dlehdrlf09@naver.com');
    await ProfileService.deleteProfile(result.id);
  });

  it('Add HashTags', async () => {
    const profile = await ProfileService.createProfile(
      hashTagNumbers as ProfileCreateData
    );
    hashTagNumbersModify.id = profile.id;
    const result = await ProfileService.modifyProfile(hashTagNumbersModify);
    console.log(result);
  });

  it('Change HashTags property', async () => {
    const profile = await ProfileService.createProfile(
      normalData as ProfileCreateData
    );
    hashTagModifyData.id = profile.id;
    const result = await ProfileService.modifyProfile(hashTagModifyData);
    expect(
      result.hashTags.some((hashTag) => hashTag.hashTag === '중앙대')
    ).toBeTruthy();
    expect(
      result.hashTags.some(
        (hashTag) => hashTag.hashTag === '멋쟁이사자처럼11기'
      )
    ).toBeTruthy();
    expect(result.email).toBe('dlehdrlf09@naver.com');
    await ProfileService.deleteProfile(result.id);
  });

  it('Change WorkSpace', async () => {
    const profile = await ProfileService.createProfile(
      noWorkSpace as ProfileCreateData
    );
    hashTagModifyData.workSpace = '프렌딩';
    hashTagModifyData.id = profile.id;
    const result = await ProfileService.modifyProfile(hashTagModifyData);
    expect(
      result.hashTags.some((hashTag) => hashTag.hashTag === '중앙대')
    ).toBeTruthy();
    expect(
      result.hashTags.some(
        (hashTag) => hashTag.hashTag === '멋쟁이사자처럼11기'
      )
    ).toBeTruthy();
    expect(result.workSpace.hashTag).toBe('프렌딩');
    expect(result.email).toBe('dlehdrlf09@naver.com');
    await ProfileService.deleteProfile(result.id);
  });
});

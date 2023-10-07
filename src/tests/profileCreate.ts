import ProfileService from '../services/ProfileService';
import { UserService } from '../services/UserService';
import dotenv from 'dotenv';
import { AppDataSource } from '../DAO/data-source';
import { LoginService } from '../services/LoginService';
import { ProfileDeleteDTO } from '../DTO/ProfileDTO';
import { getCreateDTO } from '../utils/utils';

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

describe('Profile Create Test', () => {
  const noWorkSpace = {
    name: '길동',
    isPublic: true,
    usage: '친한친구',
    hashTags: ['중앙대학교'],
    email: 'rlfehd2013@naver.com',
    userId: 1,
  };
  const normalData = {
    name: '길동',
    isPublic: true,
    usage: '친한친구',
    hashTags: ['중앙대학교'],
    email: 'rlfehd2013@naver.com',
    userId: 1,
    workSpace: '프렌딩',
  };
  const hashTagTwice = {
    name: '길동',
    isPublic: true,
    usage: '친한친구',
    hashTags: ['중앙대학교', '산업보안', '테스트1', '테스트2'],
    email: 'rlfehd2013@naver.com',
    userId: 1,
    workSpace: '프렌딩',
  };

  it('normal Profile', async () => {
    const data = getCreateDTO(normalData);
    const result = await ProfileService.createProfile(data);
    expect(result.hashTags[0].hashTag).toBe('중앙대학교');
    expect(result.workSpace.hashTag).toBe('프렌딩');
    expect(result.email).toBe('rlfehd2013@naver.com');
    const deleteDto = new ProfileDeleteDTO();
    deleteDto.profileId = result.id;
    await ProfileService.deleteProfile(deleteDto);
  });

  it('not workSpace', async () => {
    const data = getCreateDTO(noWorkSpace);
    const result = await ProfileService.createProfile(data);
    expect(result.hashTags[0].hashTag).toBe('중앙대학교');
    expect(result.email).toBe('rlfehd2013@naver.com');
    const deleteDto = new ProfileDeleteDTO();
    deleteDto.profileId = result.id;
    await ProfileService.deleteProfile(deleteDto);
  });

  it('HashTag 여러개인경우', async () => {
    const data = getCreateDTO(hashTagTwice);
    const result = await ProfileService.createProfile(data);
    expect(result.hashTags.length).toBe(4);
    const deleteDto = new ProfileDeleteDTO();

    deleteDto.profileId = result.id;
    await ProfileService.deleteProfile(deleteDto);
  });

  it('GetALL Profile Test', async () => {
    const results = await Promise.all([
      ProfileService.createProfile(getCreateDTO(normalData)),
      ProfileService.createProfile(getCreateDTO(noWorkSpace)),
    ]);
    const result = await UserService.findAllProfile(1);
    expect(result[0].hashTags[0].hashTag).toBe('중앙대학교');
    expect(result[0].workSpace.hashTag).toBe('프렌딩');
    expect(result[0].email).toBe('rlfehd2013@naver.com');
    await Promise.all(
      results.map((res) => {
        const deleteDTO = new ProfileDeleteDTO();
        deleteDTO.profileId = res.id;
        ProfileService.deleteProfile(deleteDTO);
      })
    );
  });
});

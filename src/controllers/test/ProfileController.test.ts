import { Request, Response } from 'express';
import { Profile } from '../../entity/Profile';
import ProfileService from '../../services/ProfileService';
import { ProfileController } from '../ProfileController';
import { JWTService } from '../../services/JWTService';
import { UserService } from '../../services/UserService';

describe('ProfileController', () => {
  it('get', async () => {
    const req: any = {
      params: {
        id: 2,
      },
    };
    const res: any = {
      json: jest.fn(),
    };
    jest.spyOn(ProfileService, 'getProfile').mockResolvedValue({} as Profile);
    await ProfileController.get(req as Request, res as Response);
    expect(ProfileService.getProfile).toHaveBeenCalledWith(2);
    expect(res.json).toHaveBeenCalledWith({});
  });

  it('getAll', async () => {
    const req: any = {
      headers: {
        authorization: '',
      },
    };
    const res: any = {
      json: jest.fn(),
    };
    jest.spyOn(JWTService, 'verify').mockResolvedValue({ id: 2 });
    jest
      .spyOn(UserService, 'findAllProfile')
      .mockResolvedValue([] as Profile[]);
    await ProfileController.getAll(req as Request, res as Response);
    expect(JWTService.verify).toHaveBeenCalledWith('');
    expect(UserService.findAllProfile).toHaveBeenCalledWith(2);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it('post', async () => {
    const req: any = {
      headers: {
        authorization: '',
      },
      body: {
        name: '길동',
        isPublic: true,
        hashTags: ['중앙대학교', '산업보안', '테스트1', '테스트2'],
        email: 'rlfehd2013@naver.com',
        workSpace: '프렌딩',
      },
    };

    const result = {
      discord: undefined,
      email: 'rlfehd2013@naver.com',
      facebook: undefined,
      hashTags: ['중앙대학교', '산업보안', '테스트1', '테스트2'],
      image: undefined,
      instagram: undefined,
      isPublic: true,
      kakaoTalk: undefined,
      line: undefined,
      name: '길동',
      naverBand: undefined,
      naverBlog: undefined,
      nickName: undefined,
      phone: undefined,
      telegram: undefined,
      twitter: undefined,
      userId: 2,
      workSpace: '프렌딩',
    };
    const res: any = {
      json: jest.fn(),
    };
    jest.spyOn(JWTService, 'verify').mockResolvedValue({ id: 2 });
    jest.spyOn(ProfileService, 'createProfile').mockResolvedValue(undefined);
    await ProfileController.post(req as Request, res as Response);
    expect(JWTService.verify).toHaveBeenCalledWith('');
    expect(ProfileService.createProfile).toHaveBeenCalledWith(result);
    expect(res.json).toHaveBeenCalledWith('성공');
  });

  it('thread post', async () => {
    const req: any = {
      headers: {
        authorization: '',
      },
      body: {
        name: '길동',
        isPublic: true,
        hashTags: ['중앙대학교', '산업보안', '테스트1', '테스트2'],
        email: 'rlfehd2013@naver.com',
        workSpace: '프렌딩',
        thread: 'asdf',
      },
    };

    const result = {
      discord: undefined,
      email: 'rlfehd2013@naver.com',
      facebook: undefined,
      hashTags: ['중앙대학교', '산업보안', '테스트1', '테스트2'],
      image: undefined,
      instagram: undefined,
      isPublic: true,
      kakaoTalk: undefined,
      thread: 'asdf',
      line: undefined,
      name: '길동',
      naverBand: undefined,
      naverBlog: undefined,
      nickName: undefined,
      phone: undefined,
      telegram: undefined,
      twitter: undefined,
      userId: 2,
      workSpace: '프렌딩',
    };
    const res: any = {
      json: jest.fn(),
    };
    jest.spyOn(JWTService, 'verify').mockResolvedValue({ id: 2 });
    jest.spyOn(ProfileService, 'createProfile').mockResolvedValue(undefined);
    await ProfileController.post(req as Request, res as Response);
    expect(JWTService.verify).toHaveBeenCalledWith('');
    expect(ProfileService.createProfile).toHaveBeenCalledWith(result);
    expect(res.json).toHaveBeenCalledWith('성공');
  });

  it('patch', async () => {
    const req: any = {
      headers: {
        authorization: '',
      },
      body: {
        name: '길동',
        isPublic: true,
        hashTags: ['중앙대학교', '산업보안', '테스트1', '테스트2'],
        email: 'rlfehd2013@naver.com',
        workSpace: '프렌딩',
      },
      params: {
        id: 2,
      },
    };

    const result = {
      id: 2,
      discord: undefined,
      email: 'rlfehd2013@naver.com',
      facebook: undefined,
      hashTags: ['중앙대학교', '산업보안', '테스트1', '테스트2'],
      image: undefined,
      instagram: undefined,
      kakaoTalk: undefined,
      line: undefined,
      name: '길동',
      naverBand: undefined,
      naverBlog: undefined,
      nickName: undefined,
      phone: undefined,
      telegram: undefined,
      twitter: undefined,
      userId: 3,
      workSpace: '프렌딩',
    };
    const res: any = {
      json: jest.fn(),
    };
    jest.spyOn(JWTService, 'verify').mockResolvedValue({ id: 3 });
    jest
      .spyOn(ProfileService, 'modifyProfile')
      .mockResolvedValue({} as Profile);
    await ProfileController.patch(req as Request, res as Response);
    expect(JWTService.verify).toHaveBeenCalledWith('');
    expect(ProfileService.modifyProfile).toHaveBeenCalledWith(result);
    expect(res.json).toHaveBeenCalledWith({});
  });

  it('delete', async () => {
    const req: any = {
      headers: {
        authorization: '',
      },
      params: {
        id: 1,
      },
    };
    const res: any = {
      json: jest.fn(),
    };
    jest.spyOn(JWTService, 'verify').mockResolvedValue({ id: 3 });
    jest.spyOn(ProfileService, 'deleteProfile').mockResolvedValue(undefined);
    await ProfileController.delete(req as Request, res as Response);
    expect(JWTService.verify).toHaveBeenCalledWith('');
    expect(ProfileService.deleteProfile).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith('삭제완료');
  });
});

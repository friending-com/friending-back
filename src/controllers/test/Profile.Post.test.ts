import { Request, Response } from 'express';
import { JWTService } from '../../services/JWTService';
import ProfileService from '../../services/ProfileService';
import { ProfileController } from '../ProfileController';

describe('profile post test', () => {
  it('post', async () => {
    const req: any = {
      headers: {
        authorization: '',
      },
      body: {
        name: '길동',
        isPublic: true,
        usage: '친한친구',
        hashTags: ['중앙대학교', '산업보안', '테스트1', '테스트2'],
        email: 'rlfehd2013@naver.com',
        workSpace: '프렌딩',
      },
    };

    const result = {
      discord: undefined,
      email: 'rlfehd2013@naver.com',
      usage: '친한친구',
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
      info: undefined,
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
        usage: '친한친구',
        isPublic: true,
        hashTags: ['중앙대학교', '산업보안', '테스트1', '테스트2'],
        email: 'rlfehd2013@naver.com',
        workSpace: '프렌딩',
        thread: 'asdf',
      },
    };

    const result = {
      usage: '친한친구',
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

  it('post all value', async () => {
    const req: any = {
      headers: {
        authorization: '',
      },
      body: {
        name: '길동',
        usage: '찐친',
        isPublic: true,
        hashTags: ['중앙대학교', '산업보안', '테스트1', '테스트2'],
        email: 'rlfehd2013@naver.com',
        workSpace: '프렌딩',
        nickName: 'string',
        instagram: 'snsURL',
        twitter: 'snsURL',
        phone: 'string',
        facebook: 'snsURL',
        kakaoTalk: 'snsURL',
        discord: 'snsURL',
        line: 'snsURL',
        thread: 'snsURL',
        naverBlog: 'snsURL',
        naverBand: 'snsURL',
        telegram: 'snsURL',
        info: 'string',
        image: 'string',
      },
    };

    const result = {
      name: '길동',
      isPublic: true,
      usage: '찐친',
      hashTags: ['중앙대학교', '산업보안', '테스트1', '테스트2'],
      email: 'rlfehd2013@naver.com',
      workSpace: '프렌딩',
      nickName: 'string',
      instagram: 'snsURL',
      twitter: 'snsURL',
      phone: 'string',
      facebook: 'snsURL',
      kakaoTalk: 'snsURL',
      discord: 'snsURL',
      line: 'snsURL',
      thread: 'snsURL',
      naverBlog: 'snsURL',
      naverBand: 'snsURL',
      telegram: 'snsURL',
      info: 'string',
      image: 'string',
      userId: 2,
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
});

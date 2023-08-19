import { Request, Response } from 'express';
import { CallbackService } from '../../services/CallbackService';
import { LoginService } from '../../services/LoginService';
import { CallbackController } from '../CallbackController';

describe('callback Controller', () => {
  it('google', async () => {
    const req: any = {
      body: {
        accessToken: 'googleAccessToken',
        platform: 'google',
      },
    };
    const mockGoogleData = {
      email: 'rlfehd2013@naver.com',
      name: 'gildong',
      picture: 'https://~',
    };
    const mockTokenData = {
      access: 'asdf',
      refresh: 'asdf',
    };
    const res: any = {
      json: jest.fn(),
    };
    jest.spyOn(CallbackService, 'google').mockResolvedValue(mockGoogleData);
    jest.spyOn(LoginService, 'login').mockResolvedValue(mockTokenData);

    await CallbackController.post(req as Request, res as Response);
    expect(CallbackService.google).toHaveBeenCalledWith('googleAccessToken');
    expect(LoginService.login).toHaveBeenCalledWith(mockGoogleData);
    expect(res.json).toHaveBeenCalledWith(mockTokenData);
  });

  it('kakao', async () => {
    const req: any = {
      body: {
        accessToken: 'kakaoAccessToken',
        platform: 'kakao',
      },
    };
    const mockKakaoData = {
      id: 'rlfehd2013',
      kakao_account: {
        profile: {
          nickname: '동길',
          profile_image_url: 'https://~',
        },
        name: '길동',
        email: 'rlfehd2013@naver.com',
        gender: 'male',
        birthday: '0422',
      },
    };
    const mockTokenData = {
      access: 'asdf',
      refresh: 'asdf',
    };
    const res: any = {
      json: jest.fn(),
    };
    jest.spyOn(CallbackService, 'kakao').mockResolvedValue(mockKakaoData);
    jest.spyOn(LoginService, 'login').mockResolvedValue(mockTokenData);

    await CallbackController.post(req as Request, res as Response);
    expect(CallbackService.kakao).toHaveBeenCalledWith('kakaoAccessToken');
    expect(LoginService.login).toHaveBeenCalledWith(
      mockKakaoData.kakao_account
    );
    expect(res.json).toHaveBeenCalledWith(mockTokenData);
  });
});

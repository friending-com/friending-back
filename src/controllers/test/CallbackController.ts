import { Request, Response } from 'express';
import { CallbackService } from '../../services/CallbackService';
import { LoginService } from '../../services/LoginService';
import { CallbackController } from '../CallbackController';

describe('callback Controller', () => {
  it('', async () => {
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
});

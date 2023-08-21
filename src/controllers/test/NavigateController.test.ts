import { JWTService } from '../../services/JWTService';
import { AuthorizationService } from '../../services/AuthorizationService';
import { Profile } from '../../entity/Profile';
import { NavigateService } from '../../services/NavigateService';
import { NavigateController } from '../NavigateController';
import { Request, Response } from 'express';

describe('NavigateController', () => {
  it('post', async () => {
    const req: any = {
      headers: {
        authorization: '',
      },
      body: {
        findProfile: 2,
        userProfile: 3,
      },
    };

    const res: any = {
      json: jest.fn(),
    };

    jest.spyOn(JWTService, 'verify').mockResolvedValue({ id: 1 });
    jest
      .spyOn(AuthorizationService, 'doesUserHaveProfile')
      .mockResolvedValue({} as Profile);
    jest.spyOn(NavigateService, 'navigate').mockResolvedValue([]);

    await NavigateController.post(req as Request, res as Response);
    expect(JWTService.verify).toHaveBeenCalledWith('');
    expect(AuthorizationService.doesUserHaveProfile).toHaveBeenCalledWith(1, 3);
    expect(NavigateService.navigate).toHaveBeenCalledWith(3, 2);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it('post exception test', async () => {
    const req: any = {
      headers: {
        authorization: '',
      },
      body: {
        findProfile: 2,
        userProfile: 3,
      },
    };

    const res: any = {
      json: jest.fn(),
    };

    jest.spyOn(JWTService, 'verify').mockResolvedValue({ id: 1 });
    jest
      .spyOn(AuthorizationService, 'doesUserHaveProfile')
      .mockResolvedValue(null);
    jest.spyOn(NavigateService, 'navigate').mockResolvedValue([]);

    try {
      await NavigateController.post(req as Request, res as Response);
    } catch (err) {
      expect(err.message).toBe('프로필의 소유 권한이 없습니다!');
    }
  });
});

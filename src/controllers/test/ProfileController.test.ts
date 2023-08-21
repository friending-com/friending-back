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

  
});

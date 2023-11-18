import { Request, Response } from 'express';
import { Profile } from '../../entity/Profile';
import { AuthorizationService } from '../../services/AuthorizationService';
import { JWTService } from '../../services/JWTService';
import { FriendController } from '../FriendController';
import { FriendService } from '../../services/FriendService';

describe('friend Controller', () => {
  it('post', async () => {
    jest.spyOn(JWTService, 'verify').mockResolvedValue({ id: 1 });
    jest
      .spyOn(AuthorizationService, 'doesUserHaveProfile')
      .mockResolvedValue(true as unknown as Profile);
    jest.spyOn(FriendService, 'add').mockReturnValue(undefined);
    const req: any = {
      headers: {
        authorization: '',
      },
      body: {
        userProfileId: 1,
        subProfileId: 2,
      },
    };
    const res: any = {
      json: jest.fn(),
    };
    await FriendController.post(req as Request, res as Response);
    expect(AuthorizationService.doesUserHaveProfile).toHaveBeenCalledWith(1, 1);
    expect(JWTService.verify).toHaveBeenCalledWith('');
  });

  it('getAll', async () => {
    jest.spyOn(JWTService, 'verify').mockResolvedValue({ id: 1 });
    const req: any = {
      headers: {
        authorization: '',
      },
    };
    const res: any = {
      json: jest.fn(),
    };
    jest
      .spyOn(FriendService, 'getFriendProfiles')
      .mockResolvedValue([] as unknown as Profile[]);
    await FriendController.getAll(req as Request, res as Response);
    expect(JWTService.verify).toHaveBeenCalledWith('');
    expect(FriendService.getFriendProfiles).toHaveBeenCalledWith({ userId: 1 });
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it('get', async () => {
    const req: any = {
      query: {
        id: 3,
      },
    };
    const res: any = {
      json: jest.fn(),
    };
    jest.spyOn(FriendService, 'show').mockResolvedValue([] as Profile[]);
    await FriendController.get(req as Request, res as Response);
    expect(FriendService.show).toHaveBeenCalledWith({ profileId: 3 });
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it('delete', async () => {
    const req: any = {
      headers: {
        authorization: '',
      },
      query: {
        userProfileId: 3,
        subProfileId: 4,
      },
    };
    const res: any = {
      json: jest.fn(),
    };
    jest.spyOn(JWTService, 'verify').mockResolvedValue({ id: 1 });
    jest
      .spyOn(AuthorizationService, 'doesUserHaveProfile')
      .mockResolvedValue({} as Profile);
    jest.spyOn(FriendService, 'delete').mockResolvedValue(undefined);
    await FriendController.delete(req as Request, res as Response);
    expect(AuthorizationService.doesUserHaveProfile).toHaveBeenCalledWith(1, 3);
    expect(FriendService.delete).toHaveBeenCalledWith({
      userId: 1,
      userProfileId: 3,
      subProfileId: 4,
    });
    expect(res.json).toHaveBeenCalledWith('친구 삭제를 완료하였습니다');
  });
});

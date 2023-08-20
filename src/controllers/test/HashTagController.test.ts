import { Profile } from '../../entity/Profile';
import { AuthorizationService } from '../../services/AuthorizationService';
import { JWTService } from '../../services/JWTService';
import { HashTagService } from '../../services/hashTagService';
import { HashTagController } from '../HashTagController';
import { Request, Response } from 'express';
describe('HashTagController', () => {
  it('post', async () => {
    const req: any = {
      headers: {
        authorization: '',
      },
      body: {
        hashTagName: '해시태그',
        profileId: 2,
      },
    };
    const res: any = {
      json: jest.fn(),
    };
    jest.spyOn(JWTService, 'verify').mockResolvedValue({ id: 1 });
    jest
      .spyOn(AuthorizationService, 'doesUserHaveProfile')
      .mockResolvedValue({} as Profile);
    jest.spyOn(HashTagService, 'add').mockResolvedValue(undefined);

    await HashTagController.post(req as Request, res as Response);

    expect(JWTService.verify).toHaveBeenCalledWith('');
    expect(AuthorizationService.doesUserHaveProfile).toHaveBeenCalledWith(1, 2);
    expect(HashTagService.add).toHaveBeenCalledWith('해시태그', 2);
    expect(res.json).toHaveBeenCalledWith('hashTag 등록 완료');
  });

  it('get', async () => {
    const req: any = {
      query: {
        hashTagName: '해시태그',
      },
    };
    const res: any = {
      json: jest.fn(),
    };
    jest.spyOn(HashTagService, 'search').mockResolvedValue([] as Profile[]);
    await HashTagController.get(req as Request, res as Response);
    expect(HashTagService.search).toHaveBeenCalledWith('해시태그');
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it('delete', async () => {
    const req: any = {
      headers: {
        authorization: '',
      },
      query: {
        hashTagName: '해시태그',
        profileId: 2,
      },
    };
    const res: any = {
      json: jest.fn(),
    };
    jest.spyOn(JWTService, 'verify').mockResolvedValue({ id: 1 });
    jest.spyOn(HashTagService, 'delete').mockResolvedValue(undefined);
    jest
      .spyOn(AuthorizationService, 'doesUserHaveProfile')
      .mockResolvedValue({} as Profile);
    await HashTagController.delete(req as Request, res as Response);

    expect(JWTService.verify).toHaveBeenCalledWith('');
    expect(AuthorizationService.doesUserHaveProfile).toHaveBeenCalledWith(1, 2);
    expect(HashTagService.delete).toHaveBeenCalledWith('해시태그', 2);
    expect(res.json).toHaveBeenCalledWith('hashTag가 삭제되었습니다');
  });
});

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
});

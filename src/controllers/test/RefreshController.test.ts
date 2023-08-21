import { Request, Response } from 'express';
import { JWTService } from '../../services/JWTService';
import { RefreshController } from '../RefreshController';

describe('delete', () => {
  it('post', async () => {
    const req: any = {
      headers: {
        authorization: 'access',
      },
      body: {
        refreshToken: 'refresh',
      },
    };
    const res: any = {
      json: jest.fn(),
    };
    const newToken = { access: 'newAccess', refresh: 'newRefresh' };
    jest.spyOn(JWTService, 'refreshCheck').mockResolvedValue(newToken);
    await RefreshController.post(req as Request, res as Response);
    expect(JWTService.refreshCheck).toHaveBeenCalledWith('access', 'refresh');
    expect(res.json).toHaveBeenCalledWith(newToken);
  });
});

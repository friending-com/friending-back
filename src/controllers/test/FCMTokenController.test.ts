import { JWTService } from '../../services/JWTService';
import { UserService } from '../../services/UserService';
import { FcmToken } from '../FcmTokenController';

describe('FCMTokenController 기능 테스트', () => {
  beforeAll(() => {
    jest
      .spyOn(JWTService, 'verify')
      .mockImplementation(async () => ({ id: 1 }));
    jest
      .spyOn(UserService, 'registerfcmToken')
      .mockImplementation(async () => {});
  });

  it('fcm TokenValidation을 마친 dto를 통해 registerfcmToken을 호출할 수 있다.', async () => {
    const req = {
      headers: {
        authorization: '1',
      },
      body: {
        token: 'testToken',
      },
    } as any;
    const res = {
      json: jest.fn(),
    } as any;

    await FcmToken.register(req, res);
    expect(JWTService.verify).toBeCalled();
    expect(UserService.registerfcmToken).toBeCalledWith({
      id: 1,
      token: 'testToken',
    });
  });
});

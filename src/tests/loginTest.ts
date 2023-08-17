import { LoginService } from '../services/LoginService';
import dotenv from 'dotenv';
import { AppDataSource } from '../DAO/data-source';

beforeAll(async () => {
  dotenv.config();
  try {
    await AppDataSource.initialize();
  } catch (err) {
    console.log(err);
  }
});
afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Login Test', () => {
  it('access and refresh', async () => {
    const result = await LoginService.login({
      email: 'rlfehd2013@naver.com',
      name: 'gildong',
      picture: '1',
    });
    expect(result.access).toBeTruthy();
    expect(result.refresh).toBeTruthy();
  });
});

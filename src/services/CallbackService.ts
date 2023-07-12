import axios, { isAxiosError } from 'axios';
import { GoogleProfile, KakaoResponse } from '../types/socialProfile';
import ErrorStatus from '../utils/ErrorStatus';
export class CallbackService {
  static async google(token: string) {
    try {
      const data = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.data);
      return data.data as GoogleProfile;
    } catch (err) {
      if (isAxiosError(err)) {
        throw new ErrorStatus(err.response.data, 401);
      }
    }
  }

  static async kakao(token: string) {
    try {
      const data = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data as KakaoResponse;
    } catch (err) {
      if (isAxiosError(err)) {
        throw new ErrorStatus(err.response.data, 401);
      }
    }
  }
}
//delete 문제

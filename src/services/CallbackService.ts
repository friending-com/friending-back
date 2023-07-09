import axios, { isAxiosError } from 'axios';
import { GoogleProfile } from '../types/socialProfile';
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
        console.log(err);
        console.log(err.response.status, err.response.data);
      }
    }
  }
}
//delete 문제

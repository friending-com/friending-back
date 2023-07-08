import axios, { isAxiosError } from 'axios';
export class CallbackService {
  static async googlePost(code: string) {
    try {
      const token = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        grant_type: 'authorization_code',
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        scope: 'email profile',
      });
      console.log(token.data);
    } catch (err) {
      if (isAxiosError(err)) {
        console.log(err);
        console.log(err.response.status, err.response.data);
      }
    }
  }
}
//delete 문제
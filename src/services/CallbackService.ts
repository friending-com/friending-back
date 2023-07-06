import axios, { isAxiosError } from 'axios';
export class CallbackService {
  static async googlePost(code: string) {
    try {
      const token = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      });
      console.log(token.data);
    } catch (err) {
      if (isAxiosError(err))
        console.log(err.response.status, err.response.data);
    }
  }
}

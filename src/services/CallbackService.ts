import axios from 'axios';
export class CallbackService {
  static async googlePost(code: string) {
    try {
      console.log(process.env.GOOGLE_CLIENT_ID);
      const token = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      });
      console.log(token);
    } catch (err) {
      console.log(err);
    }
  }
}

import axios from 'axios';
export class CallbackService {
  static async googlePost(code: string) {
    const url = `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}`;
    console.log(url);
    try {
      const token = await axios.get(url);
      console.log(token);
    } catch (err) {
      console.log(err);
    }
  }
}

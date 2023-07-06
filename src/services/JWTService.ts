import jwt from 'jsonwebtoken';
import ErrorStatus from '../utils/ErrorStatus';
export class JWTService {
  static async issue(id: number) {
    const access = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
    const refresh = jwt.sign({ access, id }, process.env.JWT_SECRET, {
      expiresIn: '14d',
    });
    return { access, refresh };
  }

  static async verify(access: string) {
    jwt.verify(access, process.env.SECRET, (err, decoded) => {
      if (err) {
        throw err;
      }
      return decoded;
    });
  }
  static async refreshCheck(access: string, refresh: string) {
    jwt.verify(refresh, process.env.SECRET, (err, decoded) => {
      if (err) {
        throw err;
      }
      if ((decoded as any).access != access) {
        throw new ErrorStatus('유요하지 않은 JWT입니다.', 400);
      }
      const newTokens = JWTService.issue((decoded as any).id);
      return newTokens;
    });
  }
}

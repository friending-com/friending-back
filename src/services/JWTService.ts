import jwt from 'jsonwebtoken';
export class JWTService {
  static async issue(id: number) {
    const access = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
    const refresh = jwt.sign({ access }, process.env.JWT_SECRET, {
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
}

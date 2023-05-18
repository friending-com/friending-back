import jwt from 'jsonwebtoken';
export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw err;
    }
    return decoded;
  });
};

export const jwtMaker = (id: number) => {
  const payload = { id };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '15m',
  };
  const token = jwt.sign(payload, secret, options);
  return token;
};

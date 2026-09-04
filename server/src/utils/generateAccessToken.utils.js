import jwt from 'jsonwebtoken';
import { env } from '../config/index.js';

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: '15m',
    }
  );
};

export default generateAccessToken;

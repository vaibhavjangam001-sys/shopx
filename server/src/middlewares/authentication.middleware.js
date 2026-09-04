import jwt from 'jsonwebtoken';
import { env } from '../config/index.js';
import { ApiError } from '../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../constants/index.js';

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.UNAUTHORIZED);
  }

  const accessToken = authHeader.split(' ')[1];

  if (!accessToken) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      MESSAGES.AUTH.INVALID_ACCESS_TOKEN
    );
  }

  try {
    const decodedToken = jwt.verify(accessToken, env.JWT_ACCESS_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      MESSAGES.AUTH.INVALID_ACCESS_TOKEN
    );
  }
};

export default authenticationMiddleware;

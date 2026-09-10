import jwt from 'jsonwebtoken';
import { env } from '../config/index.js';
import { ApiError } from '../utils/index.js';
import { cookieFeatures, HTTP_STATUS, MESSAGES } from '../constants/index.js';

const authenticationMiddleware = (req, res, next) => {
  const accessToken = req.cookies?.[cookieFeatures.COOKIE_NAMES.ACCESS_TOKEN];

  if (!accessToken) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.UNAUTHORIZED);
  }

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

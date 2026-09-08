import { ApiError } from '../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../constants/index.js';

const authorizeMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.UNAUTHORIZED);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, MESSAGES.AUTH.FORBIDDEN);
    }

    next();
  };
};

export default authorizeMiddleware;

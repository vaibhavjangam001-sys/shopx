import { HTTP_STATUS, MESSAGES, ROLES } from '../constants/index.js';
import { ApiError } from '../utils/index.js';

const authorizeOwnerAndAdminMiddleware = (req, res, next) => {
  const authenticatedUser = req.user;
  const requestedUserId = req.params.userId;

  if (
    authenticatedUser.role === ROLES.ADMIN ||
    requestedUserId === authenticatedUser.id
  ) {
    return next();
  }

  throw new ApiError(HTTP_STATUS.FORBIDDEN, MESSAGES.AUTH.FORBIDDEN);
};

export default authorizeOwnerAndAdminMiddleware;

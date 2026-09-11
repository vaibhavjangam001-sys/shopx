import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { logoutUserService } from '../../service/auth/index.js';
import {
  cookieFeatures,
  HTTP_STATUS,
  MESSAGES,
} from '../../constants/index.js';

const logoutUserController = AsyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.[cookieFeatures.COOKIE_NAMES.REFRESH_TOKEN];

  if (refreshToken) {
    await logoutUserService(refreshToken);
  }

  res
    .clearCookie(
      cookieFeatures.COOKIE_NAMES.ACCESS_TOKEN,
      cookieFeatures.COOKIE_OPTIONS
    )
    .clearCookie(
      cookieFeatures.COOKIE_NAMES.REFRESH_TOKEN,
      cookieFeatures.COOKIE_OPTIONS
    )
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, null, MESSAGES.AUTH.LOGOUT_SUCCESS));
});

export default logoutUserController;

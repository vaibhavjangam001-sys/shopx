import { refreshTokenService } from '../../service/auth/index.js';
import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import {
  cookieFeatures,
  HTTP_STATUS,
  MESSAGES,
} from '../../constants/index.js';

const refreshTokenController = AsyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.[cookieFeatures.COOKIE_NAMES.REFRESH_TOKEN];

  const { accessToken, refreshToken: newRefreshToken } =
    await refreshTokenService(refreshToken);

  res
    .cookie(
      cookieFeatures.COOKIE_NAMES.ACCESS_TOKEN,
      accessToken,
      cookieFeatures.ACCESS_TOKEN_COOKIE_OPTIONS
    )
    .cookie(
      cookieFeatures.COOKIE_NAMES.REFRESH_TOKEN,
      newRefreshToken,
      cookieFeatures.REFRESH_TOKEN_COOKIE_OPTIONS
    )
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, null, MESSAGES.AUTH.REFRESH_TOKEN_SUCCESS)
    );
});

export default refreshTokenController;

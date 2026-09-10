import {
  HTTP_STATUS,
  MESSAGES,
  cookieFeatures,
} from '../../constants/index.js';
import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { loginUserService } from '../../service/auth/index.js';

const loginUserController = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken, userObj } = await loginUserService(
    email,
    password
  );

  res
    .cookie(
      cookieFeatures.COOKIE_NAMES.ACCESS_TOKEN,
      accessToken,
      cookieFeatures.ACCESS_TOKEN_COOKIE_OPTIONS
    )
    .cookie(
      cookieFeatures.COOKIE_NAMES.REFRESH_TOKEN,
      refreshToken,
      cookieFeatures.REFRESH_TOKEN_COOKIE_OPTIONS
    )
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, userObj, MESSAGES.AUTH.LOGIN));
});

export default loginUserController;

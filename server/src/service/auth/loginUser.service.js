import { findUserByEmailForLoginRepository } from '../../repositories/user/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { ApiError, generateAccessToken } from '../../utils/index.js';
import { createRefreshTokenService } from './index.js';

const loginUserService = async (email, password) => {
  const user = await findUserByEmailForLoginRepository(email);

  if (!user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.LOGIN_FAILED);
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.LOGIN_FAILED);
  }

  const userObj = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  };

  const accessToken = generateAccessToken(user);

  const { refreshToken, expiresAt } = await createRefreshTokenService(user._id);

  return {
    userObj,
    accessToken,
    refreshToken,
    expiresAt,
  };
};

export default loginUserService;

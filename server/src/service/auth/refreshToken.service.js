import {
  deleteRefreshTokenRepository,
  findRefreshTokenByHashRepository,
} from '../../repositories/auth/index.js';
import { ApiError, generateAccessToken, hashToken } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { createRefreshTokenService } from './index.js';

const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      MESSAGES.AUTH.INVALID_REFRESH_TOKEN
    );
  }

  const tokenHash = hashToken(refreshToken);
  const storedToken = await findRefreshTokenByHashRepository(tokenHash);
  console.log(storedToken);

  if (!storedToken) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      MESSAGES.AUTH.INVALID_REFRESH_TOKEN
    );
  }

  if (storedToken.expiresAt < new Date()) {
    await deleteRefreshTokenRepository(tokenHash);

    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      MESSAGES.AUTH.EXPIRED_REFRESH_TOKEN
    );
  }

  const user = storedToken.user;

  const accessToken = generateAccessToken(user);

  await deleteRefreshTokenRepository(tokenHash);

  const { refreshToken: newRefreshToken, expiresAt } =
    await createRefreshTokenService(user._id);

  return {
    accessToken,
    refreshToken: newRefreshToken,
    expiresAt,
  };
};

export default refreshTokenService;

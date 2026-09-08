import { deleteRefreshTokenRepository } from '../../repositories/auth/index.js';
import { hashToken } from '../../utils/index.js';

const logoutUserService = async (refreshToken) => {
  const tokenHash = hashToken(refreshToken);

  await deleteRefreshTokenRepository(tokenHash);
};

export default logoutUserService;

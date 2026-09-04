import { createRefreshTokenRepository } from '../../repositories/auth/index.js';
import { generateRefreshTokne, hashToken } from '../../utils/index.js';

const createRefreshTokenService = async (userId) => {
  const refreshToken = generateRefreshTokne();
  const tokenHash = hashToken(refreshToken);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await createRefreshTokenRepository({
    user: userId,
    tokenHash,
    expiresAt,
  });

  return {
    refreshToken,
    expiresAt,
  };
};

export default createRefreshTokenService;

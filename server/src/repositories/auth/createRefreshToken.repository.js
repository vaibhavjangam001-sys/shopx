import { RefreshToken } from '../../models/index.js';

const createRefreshTokenRepository = async (refreshToken) => {
  return await RefreshToken.create(refreshToken);
};

export default createRefreshTokenRepository;

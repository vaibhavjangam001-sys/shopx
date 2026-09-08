import { RefreshToken } from '../../models/index.js';

const deleteRefreshTokenRepository = async (tokenHash) => {
  return await RefreshToken.deleteOne({ tokenHash });
};

export default deleteRefreshTokenRepository;

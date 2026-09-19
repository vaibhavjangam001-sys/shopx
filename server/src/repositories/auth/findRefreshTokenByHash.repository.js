import { RefreshToken } from '../../models/index.js';

const findRefreshTokenByHashRepository = async (tokenHash) => {
  return await RefreshToken.findOne({ tokenHash }).populate('user');
};

export default findRefreshTokenByHashRepository;

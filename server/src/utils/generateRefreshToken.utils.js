import crypto from 'crypto';

const generateRefreshTokne = () => {
  return crypto.randomBytes(64).toString('hex');
};

export default generateRefreshTokne;

import { registerUserRepository } from '../../repositories/auth/index.js';
import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const registerUserService = async (userData) => {
  const user = await registerUserRepository(userData);

  if (!user) {
  }

  return user;
};

export default registerUserService;

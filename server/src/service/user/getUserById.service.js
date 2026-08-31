import { findUserByIdRepository } from '../../repositories/user/index.js';
import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const getUserByIdService = async (userId) => {
  const user = await findUserByIdRepository(userId);

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.USER.NOT_FOUND);
  }

  return user;
};

export default getUserByIdService;

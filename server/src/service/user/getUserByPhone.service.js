import { findUserByPhoneRepository } from '../../repositories/user/index.js';
import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const getUserByPhoneService = async (phoneNumber) => {
  const user = await findUserByPhoneRepository(phoneNumber);

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.USER.NOT_FOUND_BY_PHONE);
  }

  return user;
};

export default getUserByPhoneService;

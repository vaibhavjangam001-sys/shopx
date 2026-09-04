import { findUserByIdRepository } from '../../repositories/user/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { ApiError } from '../../utils/index.js';

const getMyProfileService = async (userID) => {
  const user = await findUserByIdRepository(userID);

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.SERVER.INTERNAL_ERROR
    );
  }

  return user;
};

export default getMyProfileService;

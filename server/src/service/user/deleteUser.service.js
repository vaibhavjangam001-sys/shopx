import {
  deleteUserRepository,
  findUserByIdRepository,
} from '../../repositories/user/index.js';

import { ApiError } from '../../utils/index.js';

import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const deleteUserService = async (userId) => {
  const isUserExists = await findUserByIdRepository(userId);

  if (!isUserExists) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.USER.NOT_FOUND);
  }

  const deletedUser = await deleteUserRepository(userId);

  if (!deletedUser) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.USER.DELETE_FAILED
    );
  }

  return deletedUser;
};

export default deleteUserService;

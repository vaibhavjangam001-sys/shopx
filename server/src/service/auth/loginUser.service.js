import { findUserByEmailForLoginRepository } from '../../repositories/user/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { ApiError } from '../../utils/index.js';

const loginUserService = async (email, passowrd) => {
  const user = await findUserByEmailForLoginRepository(email);

  if (!user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.LOGIN_FAILED);
  }

  const isPasswordCorrect = await user.comparePassword(passowrd);

  if (!isPasswordCorrect) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.LOGIN_FAILED);
  }

  const userObj = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  };

  return userObj;
};

export default loginUserService;

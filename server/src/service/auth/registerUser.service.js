import { ApiError } from '../../utils/index.js';
import {
  findUserByEmailRepository,
  findUserByPhoneRepository,
  createUserRepository,
} from '../../repositories/user/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const registerUserService = async (userData) => {
  const { firstName, lastName, phone, email, password } = userData;

  const isEmailAlreadyExists = await findUserByEmailRepository(email);

  if (isEmailAlreadyExists) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      MESSAGES.AUTH.EMAIL_ALREADY_EXISTS
    );
  }

  const isPhoneAlreadyExists = await findUserByPhoneRepository(phone);

  if (isPhoneAlreadyExists) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      MESSAGES.AUTH.PHONE_ALREADY_EXISTS
    );
  }

  try {
    const createdUser = await createUserRepository({
      firstName,
      lastName,
      phone,
      email,
      password,
    });

    if (!createdUser) {
      throw new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        MESSAGES.AUTH.REGISTER_FAILED
      );
    }

    const userResponse = {
      id: createdUser._id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      phone: createdUser.phone,
    };

    return userResponse;
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern?.email) {
        throw new ApiError(
          HTTP_STATUS.CONFLICT,
          MESSAGES.AUTH.EMAIL_ALREADY_EXISTS
        );
      }

      if (error.keyPattern?.phone) {
        throw new ApiError(
          HTTP_STATUS.CONFLICT,
          MESSAGES.AUTH.PHONE_ALREADY_EXISTS
        );
      }
    }

    throw error;
  }
};

export default registerUserService;

import mongoose from 'mongoose';
import { ApiError } from '../../utils/index.js';
import {
  getAddressByIdRepository,
  setDefaultAddressRepository,
  unsetDefaultAddressesRepository,
} from '../../repositories/address/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const setDefaultAddressService = async (userId, addressId) => {
  const address = await getAddressByIdRepository(userId, addressId);

  if (!address) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.ADDRESS.ADDRESS_NOT_FOUND
    );
  }

  const session = await mongoose.startSession();

  try {
    let updateAddress;

    await session.withTransaction(async () => {
      await unsetDefaultAddressesRepository(userId, session);

      updateAddress = await setDefaultAddressRepository(
        userId,
        addressId,
        session
      );

      if (!updateAddress) {
        throw new ApiError(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          MESSAGES.ADDRESS.FAILED_TO_SET
        );
      }
    });

    return updateAddress;
  } finally {
    await session.endSession();
  }
};

export default setDefaultAddressService;

import {
  deleteAddressRepository,
  getAddressByIdRepository,
  getMyAddressesRepository,
  setDefaultAddressRepository,
  unsetDefaultAddressesRepository,
} from '../../repositories/address/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { ApiError } from '../../utils/index.js';
import mongoose from 'mongoose';

const deleteAddressService = async (userId, addressId) => {
  const address = await getAddressByIdRepository(userId, addressId);

  if (!address) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.ADDRESS.ADDRESS_NOT_FOUND
    );
  }

  const session = await mongoose.startSession();

  try {
    let deletedAddress;

    await session.withTransaction(async () => {
      if (!address.isDefault) {
        deletedAddress = await deleteAddressRepository(
          userId,
          addressId,
          session
        );

        if (!deletedAddress) {
          throw new ApiError(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            MESSAGES.ADDRESS.DELETE_FAILED
          );
        }

        return deletedAddress;
      }

      const addresses = await getMyAddressesRepository(userId, session);

      const replacementAddress = addresses.find(
        (item) => item._id.toString() !== addressId.toString()
      );

      if (replacementAddress) {
        await unsetDefaultAddressesRepository(userId, session);

        const updatedAddress = await setDefaultAddressRepository(
          userId,
          replacementAddress._id,
          session
        );

        if (!updatedAddress) {
          throw new ApiError(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            MESSAGES.ADDRESS.FAILED_TO_SET
          );
        }
      }

      deletedAddress = await deleteAddressRepository(
        userId,
        addressId,
        session
      );

      if (!deletedAddress) {
        throw new ApiError(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          MESSAGES.ADDRESS.DELETE_FAILED
        );
      }
    });

    return deletedAddress;
  } finally {
    await session.endSession();
  }
};

export default deleteAddressService;

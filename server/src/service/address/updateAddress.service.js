import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import {
  getAddressByIdRepository,
  updateAddressRepository,
} from '../../repositories/address/index.js';

const updateAddressService = async (userId, addressId, updateData) => {
  const address = await getAddressByIdRepository(userId, addressId);

  if (!address) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.ADDRESS.ADDRESS_NOT_FOUND
    );
  }

  const updatedAddress = await updateAddressRepository(
    userId,
    addressId,
    updateData
  );

  if (!updatedAddress) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.ADDRESS.UPDATE_FAILED
    );
  }

  return updatedAddress;
};

export default updateAddressService;

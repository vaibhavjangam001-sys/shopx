import {
  deleteAddressRepository,
  getAddressByIdRepository,
} from '../../repositories/address/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { ApiError } from '../../utils/index.js';

const deleteAddressService = async (userId, addressId) => {
  const address = await getAddressByIdRepository(userId, addressId);

  if (!address) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.ADDRESS.ADDRESS_NOT_FOUND
    );
  }

  const deletedAddress = await deleteAddressRepository(userId, addressId);

  if (!deletedAddress) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.ADDRESS.DELETE_FAILED
    );
  }

  return deletedAddress;
};

export default deleteAddressService;

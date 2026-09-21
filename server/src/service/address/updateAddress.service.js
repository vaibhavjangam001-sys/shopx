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

  const allowedFields = [
    'fullName',
    'phone',
    'alternativePhone',
    'addressLine1',
    'addressLine2',
    'city',
    'state',
    'postalCode',
    'country',
    'addressType',
  ];

  const setDefaultData = {};

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      setDefaultData[field] = updateData[field];
    }
  }

  if (Object.keys(setDefaultData).length === 0) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.ADDRESS.INVALID_FIELD__FOR_UPDATE
    );
  }

  const updatedAddress = await updateAddressRepository(
    userId,
    addressId,
    setDefaultData
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

import { createAddressRepository } from '../../repositories/address/index.js';

const createAddressService = async (userId, addressData) => {
  const createdAddress = await createAddressRepository({
    ...addressData,
    user: userId,
  });

  return createdAddress;
};

export default createAddressService;

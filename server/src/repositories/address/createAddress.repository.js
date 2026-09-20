import { Address } from '../../models/index.js';

const createAddressRepository = async (addressData) => {
  return await Address.create(addressData);
};

export default createAddressRepository;

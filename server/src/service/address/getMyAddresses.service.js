import { getMyAddressesRepository } from '../../repositories/address/index.js';

const getMyAddressesService = async (userId) => {
  const addresses = await getMyAddressesRepository(userId);
  return addresses;
};

export default getMyAddressesService;

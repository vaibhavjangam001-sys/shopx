import { Address } from '../../models/index.js';

const getMyAddressesRepository = async (userId) => {
  return await Address.find({
    user: userId,
  }).sort({
    isDefault: -1,
    createdAt: -1,
  });
};

export default getMyAddressesRepository;

import { Address } from '../../models/index.js';

const getAddressByIdRepository = async (userId, addressId) => {
  return await Address.findOne({
    _id: addressId,
    user: userId,
  });
};

export default getAddressByIdRepository;

import { Address } from '../../models/index.js';

const getAddressByIdRepository = async (userId, addressId, session) => {
  return await Address.findOne({
    _id: addressId,
    user: userId,
  }).session(session);
};

export default getAddressByIdRepository;

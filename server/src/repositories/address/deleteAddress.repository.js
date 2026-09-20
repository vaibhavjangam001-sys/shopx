import { Address } from '../../models/index.js';

const deleteAddressRepository = async (userId, addressId) => {
  return await Address.findOneAndDelete({
    _id: addressId,
    user: userId,
  });
};

export default deleteAddressRepository;

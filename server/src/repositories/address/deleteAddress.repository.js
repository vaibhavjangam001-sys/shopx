import { Address } from '../../models/index.js';

const deleteAddressRepository = async (userId, addressId, session) => {
  return await Address.findOneAndDelete(
    {
      _id: addressId,
      user: userId,
    },
    {
      session,
    }
  );
};

export default deleteAddressRepository;

import { Address } from '../../models/index.js';

const setDefaultAddressRepository = async (userId, addressId, session) => {
  return await Address.findOneAndUpdate(
    {
      _id: addressId,
      user: userId,
    },
    {
      $set: {
        isDefault: true,
      },
    },
    {
      returnDocument: 'after',
      runValidators: true,
      session,
    }
  );
};

export default setDefaultAddressRepository;

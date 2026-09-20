import { Address } from '../../models/index.js';

const updateAddressRepository = async (userId, addressId, updateData) => {
  return await Address.findOneAndUpdate(
    {
      _id: addressId,
      user: userId,
    },
    {
      $set: updateData,
    },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
};

export default updateAddressRepository;

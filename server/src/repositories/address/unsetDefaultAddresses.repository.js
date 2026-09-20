import { Address } from '../../models/index.js';

const unsetDefaultAddressesRepository = async (userId) => {
  return await Address.updateMany(
    {
      user: userId,
      isDefault: true,
    },
    {
      $set: {
        isDefault: false,
      },
    }
  );
};

export default unsetDefaultAddressesRepository;

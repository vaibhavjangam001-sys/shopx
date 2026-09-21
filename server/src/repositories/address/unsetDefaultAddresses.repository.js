import { Address } from '../../models/index.js';

const unsetDefaultAddressesRepository = async (userId, session) => {
  return await Address.updateMany(
    {
      user: userId,
      isDefault: true,
    },
    {
      $set: {
        isDefault: false,
      },
    },
    {
      session,
    }
  );
};

export default unsetDefaultAddressesRepository;

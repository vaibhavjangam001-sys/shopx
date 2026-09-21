import { Address } from '../../models/index.js';

const getMyAddressesRepository = async (userId, session) => {
  return await Address.find(
    {
      user: userId,
    },
    null,
    {
      session,
    }
  ).sort({
    isDefault: -1,
    createdAt: -1,
  });
};

export default getMyAddressesRepository;

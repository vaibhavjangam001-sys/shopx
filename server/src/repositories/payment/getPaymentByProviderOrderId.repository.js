import { Payment } from '../../models/index.js';

const getPaymentByProviderOrderIdRepository = async (providerOrderId) => {
  return await Payment.findOne({
    providerOrderId,
  });
};

export default getPaymentByProviderOrderIdRepository;

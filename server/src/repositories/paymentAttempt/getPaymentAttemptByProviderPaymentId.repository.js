import { PaymentAttempt } from '../../models/index.js';

const getPaymentAttemptByProviderPaymentIdRepository = async (
  providerPaymentId,
  session = null
) => {
  return await PaymentAttempt.findOne({ providerPaymentId }).session(session);
};

export default getPaymentAttemptByProviderPaymentIdRepository;

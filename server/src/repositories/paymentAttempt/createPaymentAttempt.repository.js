import { PaymentAttempt } from '../../models/index.js';

const createPaymentAttemptRepository = async (attemptData, session = null) => {
  const options = session ? { session } : {};

  const [paymentAttempt] = await PaymentAttempt.create([attemptData], options);

  return paymentAttempt;
};

export default createPaymentAttemptRepository;

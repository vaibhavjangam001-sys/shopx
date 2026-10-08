import { Payment } from '../../models/index.js';

const createPaymentRepository = async (paymentData, session = null) => {
  const [payment] = await Payment.create([paymentData], { session });
  return payment;
};

export default createPaymentRepository;

import { Payment } from '../../models/index.js';

const getPaymentByIdRepository = async (paymentId) => {
  return await Payment.findById(paymentId).populate('user').populate('order');
};

export default getPaymentByIdRepository;

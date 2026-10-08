import { Payment } from '../../models/index.js';

const getPaymentByOrderIdRepository = async (orderId) => {
  return await Payment.findOne({ order: orderId });
};

export default getPaymentByOrderIdRepository;

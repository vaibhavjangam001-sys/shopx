import { Payment } from '../../models/index.js';

const getPaymentByOrderIdRepository = async (orderId, session = null) => {
  return await Payment.findOne({ order: orderId }).session(session);
};

export default getPaymentByOrderIdRepository;

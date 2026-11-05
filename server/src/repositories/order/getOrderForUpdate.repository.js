import { Order } from '../../models/index.js';

const getOrderForUpdateRepository = async (orderId, session = null) => {
  return await Order.findOne({
    _id: orderId,
    isDeleted: false,
  }).session(session);
};

export default getOrderForUpdateRepository;

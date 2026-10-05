import { Order } from '../../models/index.js';

const getOrderForUpdateRepository = async (orderId) => {
  return await Order.findOne({
    _id: orderId,
    isDeleted: false,
  });
};

export default getOrderForUpdateRepository;

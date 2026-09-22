import { Order } from '../../models/index.js';

const getOrderByIdRepository = async (orderId) => {
  return await Order.findById(orderId);
};

export default getOrderByIdRepository;

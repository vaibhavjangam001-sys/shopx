import { Order } from '../../models/index.js';

const deleteOrderRepository = async (orderId) => {
  return await Order.findByIdAndDelete(orderId);
};

export default deleteOrderRepository;

import { Order } from '../../models/index.js';

const createOrderRepository = async (orderData, session) => {
  const [order] = await Order.create([orderData], { session });
  return order;
};

export default createOrderRepository;

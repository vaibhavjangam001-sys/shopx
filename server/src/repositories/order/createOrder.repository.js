import { Order } from '../../models/index.js';

const createOrderRepository = async (orderData) => {
  return await Order.create(orderData);
};

export default createOrderRepository;

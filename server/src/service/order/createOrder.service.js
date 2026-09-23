import {} from '../../utils/index.js';
import {} from '../../constants/index.js';
import { createOrderRepository } from '../../repositories/order/index.js';

const createOrderService = async (orderData) => {
  const order = await createOrderRepository(orderData);
  return order;
};

export default createOrderService;

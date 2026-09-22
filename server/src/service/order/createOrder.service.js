import {} from '../../utils/index.js';
import {} from '../../constants/index.js';
import { createOrderRepository } from '../../service/order/index.js';

const createOrderService = async (orderData) => {
  const order = await createOrderRepository(orderData);
};

export default createOrderService;

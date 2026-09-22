import { Order } from '../../models/index.js';

const getOrdersRepository = async () => {
  return await Order.find();
};

export default getOrdersRepository;

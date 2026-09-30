import { Order } from '../../models/index.js';

const getOrderByIdRepository = async (userId, orderId) => {
  return await Order.findOne({
    _id: orderId,
    user: userId,
    isDeleted: false,
  });
};

export default getOrderByIdRepository;

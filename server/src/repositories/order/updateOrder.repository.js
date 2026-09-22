import { Order } from '../../models/index.js';

const updateOrderRepository = async (orderId, updateOrderData) => {
  return await Order.findByIdAndUpdate(
    {
      _id: orderId,
    },
    {
      $set: updateOrderData,
    },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
};

export default updateOrderRepository;

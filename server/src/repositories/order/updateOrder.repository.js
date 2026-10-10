import { Order } from '../../models/index.js';

const updateOrderRepository = async (orderId, updateOrderData, session) => {
  const filter = {
    _id: orderId,
  };

  if (updateOrderData.status === 'CONFIRMED') {
    filter.status = 'PENDING';
  }

  return await Order.findOneAndUpdate(
    filter,
    {
      $set: updateOrderData,
    },
    {
      returnDocument: 'after',
      runValidators: true,
      ...(session && { session }),
    }
  );
};

export default updateOrderRepository;

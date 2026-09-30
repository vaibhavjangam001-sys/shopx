import { Order } from '../../models/index.js';

const deleteOrderRepository = async (orderId, session) => {
  return await Order.findByIdAndUpdate(
    orderId,
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    },
    {
      runValidators: true,
      returnDocument: 'after',
      session,
    }
  );
};

export default deleteOrderRepository;

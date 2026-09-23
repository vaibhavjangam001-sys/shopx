import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { updateOrderRepository } from '../../repositories/order/index.js';

const updateOrderService = async (orderId, updateData) => {
  const updatedOrder = await updateOrderRepository(orderId, updateData);

  if (!updatedOrder) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.ORDER.UPDATE_FAILED
    );
  }

  return updatedOrder;
};

export default updateOrderService;

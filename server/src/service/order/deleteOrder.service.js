import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { deleteOrderRepository } from '../../repositories/order/index.js';

const deleteOrderService = async (orderId) => {
  const deletedOrder = await deleteOrderRepository(orderId);

  if (!deletedOrder) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.ORDER.DELETE_FAILED
    );
  }

  return deletedOrder;
};

export default deleteOrderService;

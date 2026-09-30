import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import {
  deleteOrderRepository,
  getOrderByIdRepository,
} from '../../repositories/order/index.js';

const deleteOrderService = async (userId, orderId) => {
  const fetchedOrder = await getOrderByIdRepository(userId, orderId);

  if (!fetchedOrder) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.ORDER.NOT_FOUND);
  }

  if (fetchedOrder.status !== 'PENDING') {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.ORDER.INVALID_DELETE_REQUEST
    );
  }

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

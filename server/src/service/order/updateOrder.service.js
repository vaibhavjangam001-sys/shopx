import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES, ROLES } from '../../constants/index.js';
import {
  getOrderForUpdateRepository,
  updateOrderRepository,
} from '../../repositories/order/index.js';

const updateOrderService = async (userId, orderId, updateData, userRole) => {
  const { status } = updateData;

  const order = await getOrderForUpdateRepository(orderId);

  if (!order) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.ORDER.NOT_FOUND);
  }

  const isAdmin = userRole == ROLES.ADMIN;
  const isOwner = order.user.toString() === userId;

  if (!isAdmin && !isOwner) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, MESSAGES.AUTH.FORBIDDEN);
  }

  const currentStatus = order.status;

  if (currentStatus === 'PENDING') {
    if (status === 'SHIPPED' && !isAdmin) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, MESSAGES.AUTH.FORBIDDEN);
    }

    if (status !== 'SHIPPED' && status !== 'CANCELLED') {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.ORDER.INVALID_STATUS
      );
    }
  } else if (currentStatus === 'SHIPPED') {
    if (status !== 'DELIVERED' || !isAdmin) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.ORDER.INVALID_STATUS
      );
    }
  } else {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.ORDER.UPDATE_FAILED);
  }

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

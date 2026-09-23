import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getOrderByIdRepository } from '../../repositories/order/index.js';

const getOrderByIdService = async (orderId) => {
  const order = await getOrderByIdRepository(orderId);

  if (!order) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.ORDER.NOT_FOUND);
  }

  return order;
};

export default getOrderByIdService;

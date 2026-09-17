import {
  clearCartRepository,
  getCartByUserIdRepository,
} from '../../repositories/cart/index.js';
import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const clearCartService = async (userId) => {
  const cart = await getCartByUserIdRepository(userId);

  if (!cart) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.CART.NOT_FOUND);
  }

  return await clearCartRepository(cart._id);
};

export default clearCartService;

import {
  getCartByUserIdRepository,
  removeCartItemRepository,
} from '../../repositories/cart/index.js';
import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const removeCartItemService = async (userId, productVariantId) => {
  const cart = await getCartByUserIdRepository(userId);

  if (!cart) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.PRODUCT_VARIANT.VARIANT_NOT_FOUND
    );
  }

  const cartItem = cart.items.find((item) => {
    return item.productVariant._id.toString() === productVariantId.toString();
  });

  if (!cartItem) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.CART.ITEM_NOT_FOUND);
  }

  return await removeCartItemRepository(cart._id, productVariantId);
};

export default removeCartItemService;

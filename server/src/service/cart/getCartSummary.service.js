import { getCartByUserIdRepository } from '../../repositories/cart/index.js';
import {} from '../../constants/index.js';
import { ApiError } from '../../utils/index.js';

const getCartSummaryService = async (userId) => {
  const cart = await getCartByUserIdRepository(userId);

  if (!cart) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.CART.NOT_FOUND);
  }

  let totalQuantity = 0;
  let subTotal = 0;

  const items = cart.items.map((item) => {
    const price = item.productVariant.price;
    const itemTotal = price * item.quantity;

    totalQuantity += item.quantity;
    subTotal += itemTotal;

    return {
      productVarintId: item.productVariant._id,
      quantity: item.quantity,
      price,
      itemTotal,
    };
  });

  const totalItems = cart.items.length;

  return {
    items,
    totalItems,
    totalQuantity,
    subTotal,
  };
};

export default getCartSummaryService;

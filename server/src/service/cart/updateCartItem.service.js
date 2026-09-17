import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getCartByUserIdRepository } from '../../repositories/cart/index.js';
import { getProductVariantByIdRepository } from '../../repositories/productVariant/index.js';

const updateCartItemService = async (userId, productVariantId, quantity) => {
  const productVariant =
    await getProductVariantByIdRepository(productVariantId);

  if (!productVariant) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.PRODUCT_VARIANT.VARIANT_NOT_FOUND
    );
  }

  if (quantity < 1) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.PRODUCT_VARIANT.INVALID_QUANTITY
    );
  }

  const myCart = await getCartByUserIdRepository(userId);

  if (!myCart) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.CART.NOT_FOUND);
  }

  const cartItem = myCart.items.find(
    (item) => item.productVariant.toString() === productVariantId.toString()
  );

  if (!cartItem) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.CART.NOT_FOUND);
  }

  if (quantity > productVariant.stock) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      `Only ${productVariant.stock} items are available in stock.`
    );
  }

  const price = productVariant.price;

  return await updateCartItemService(
    myCart._id,
    productVariantId,
    quantity,
    price
  );
};

export default updateCartItemService;

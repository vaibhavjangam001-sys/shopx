import {
  addCartItemRepository,
  createCartRepository,
  getCartByUserIdRepository,
} from '../../repositories/cart/index.js';
import { getProductVariantByIdRepository } from '../../repositories/productVariant/index.js';
import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const addCartItemService = async (userId, productVariantId, quantity) => {
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

  const cart = await getCartByUserIdRepository(userId);

  const existingItem = cart?.items.find(
    (item) => item.productVariant.toString() === productVariantId.toString()
  );

  const finalQuantity = (existingItem?.quantity || 0) + quantity;

  if (finalQuantity > productVariant.stock) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      `Only ${productVariant.stock} items are available in stock.`
    );
  }

  const price = productVariant.price;

  let userCart = cart;

  if (!userCart) {
    userCart = await createCartRepository(userId);
  }

  return await addCartItemRepository(
    userCart._id,
    productVariantId,
    quantity,
    price
  );
};

export default addCartItemService;

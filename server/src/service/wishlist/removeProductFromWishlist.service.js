import {
  getWishlistByUserIdRepository,
  removeProductFromWishlistRepository,
} from '../../repositories/wishlist/index.js';
import { getProductByIdRepository } from '../../repositories/product/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { ApiError } from '../../utils/index.js';

const removeProductFromWishlistService = async (userId, productId) => {
  const product = await getProductByIdRepository(productId);

  if (!product) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.PRODUCT.NOT_FOUND);
  }

  const wishlist = await getWishlistByUserIdRepository(userId);

  if (!wishlist) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.WISH_LIST.NOT_FOUND);
  }

  return await removeProductFromWishlistRepository(userId, productId);
};

export default removeProductFromWishlistService;

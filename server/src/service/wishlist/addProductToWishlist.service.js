import {
  addProductToWishlistRepository,
  createWishlistRepository,
  getWishlistByUserIdRepository,
} from '../../repositories/wishlist/index.js';
import { getProductByIdRepository } from '../../repositories/product/index.js';
import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const addProductToWishlistService = async (userId, productId) => {
  const product = await getProductByIdRepository(productId);

  if (!product) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.PRODUCT.NOT_FOUND);
  }

  const wishlist = await getWishlistByUserIdRepository(userId);

  if (!wishlist) {
    return await createWishlistRepository(userId, productId);
  }

  return await addProductToWishlistRepository(userId, productId);
};

export default addProductToWishlistService;

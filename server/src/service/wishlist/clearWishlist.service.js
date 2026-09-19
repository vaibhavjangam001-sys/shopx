import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import {
  clearWishlistRepository,
  getWishlistByUserIdRepository,
} from '../../repositories/wishlist/index.js';
import { ApiError } from '../../utils/index.js';

const clearWishlistService = async (userId) => {
  const wishlist = await getWishlistByUserIdRepository(userId);

  if (!wishlist) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.WISH_LIST.NOT_FOUND);
  }

  return await clearWishlistRepository(userId);
};

export default clearWishlistService;

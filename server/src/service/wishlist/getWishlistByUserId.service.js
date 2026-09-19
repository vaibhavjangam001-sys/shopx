import { getWishlistByUserIdRepository } from '../../repositories/wishlist/index.js';

const getWishlistByUserIdService = async (userId) => {
  const wishlist = await getWishlistByUserIdRepository(userId);

  if (!wishlist) {
    return {
      user: userId,
      products: [],
    };
  }

  return wishlist;
};

export default getWishlistByUserIdService;

import { Wishlist } from '../../models/index.js';

const createWishlistRepository = async (userId, productId) => {
  return await Wishlist.create({
    user: userId,
    products: [productId],
  });
};

export default createWishlistRepository;

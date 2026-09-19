import { Wishlist } from '../../models/index.js';

const getWishlistByUserIdRepository = async (userId) => {
  return Wishlist.findOne({ user: userId }).populate('products');
};

export default getWishlistByUserIdRepository;

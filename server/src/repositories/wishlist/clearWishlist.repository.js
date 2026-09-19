import { Wishlist } from '../../models/index.js';

const clearWishlistRepository = async (userId) => {
  return await Wishlist.findOneAndUpdate(
    {
      user: userId,
    },
    {
      $set: {
        products: [],
      },
    },
    {
      returnDocument: 'after',
    }
  );
};

export default clearWishlistRepository;

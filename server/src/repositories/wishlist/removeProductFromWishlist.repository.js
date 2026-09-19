import { Wishlist } from '../../models/index.js';

const removeProductFromWishlistRepository = async (userId, productId) => {
  return await Wishlist.findOneAndUpdate(
    {
      user: userId,
    },
    {
      $pull: {
        products: productId,
      },
    },

    {
      returnDocument: 'after',
    }
  );
};

export default removeProductFromWishlistRepository;

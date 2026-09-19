import { Wishlist } from '../../models/index.js';

const addProductToWishlistRepository = async (userId, productId) => {
  return await Wishlist.findOneAndUpdate(
    {
      user: userId,
    },
    {
      $addToSet: {
        products: productId,
      },
    },
    {
      returnDocument: 'after',
    }
  );
};

export default addProductToWishlistRepository;

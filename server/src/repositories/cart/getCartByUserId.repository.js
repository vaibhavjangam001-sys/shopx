import Cart from '../../models/cart.model.js';

const getCartByUserIdRepository = async (userId) => {
  return await Cart.findOne({
    user: userId,
  }).populate('items.productVariant');
};

export default getCartByUserIdRepository;

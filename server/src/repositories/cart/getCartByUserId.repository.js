import Cart from '../../models/cart.model.js';

const getCartByUserIdRepository = async (userId, session) => {
  return await Cart.findOne({
    user: userId,
  })
    .populate('items.productVariant')
    .session(session);
};

export default getCartByUserIdRepository;

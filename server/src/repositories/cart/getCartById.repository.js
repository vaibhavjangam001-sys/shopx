import { Cart } from '../../models/index.js';

const getCartByIdRepository = async (cartId, session) => {
  return await Cart.findById(cartId).session(session);
};

export default getCartByIdRepository;

import { Cart } from '../../models/index.js';

const getCartByIdRepository = async (cartId) => {
  return await Cart.findById(cartId);
};

export default getCartByIdRepository;

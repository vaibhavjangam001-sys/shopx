import { getCartByIdRepository } from './index.js';

const clearCartRepository = async (cartId) => {
  const cart = await getCartByIdRepository(cartId);

  if (!cart) {
    return null;
  }

  cart.items = [];

  return await cart.save();
};

export default clearCartRepository;

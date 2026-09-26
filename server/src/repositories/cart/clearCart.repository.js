import { getCartByIdRepository } from './index.js';

const clearCartRepository = async (cartId, session) => {
  const cart = await getCartByIdRepository(cartId, session);

  if (!cart) {
    return null;
  }

  cart.items = [];

  return await cart.save({ session });
};

export default clearCartRepository;

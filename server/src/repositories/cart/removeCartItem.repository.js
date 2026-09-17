import { getCartByIdRepository } from './index.js';

const removeCartItemRepository = async (cartId, productVariantId) => {
  const cart = await getCartByIdRepository(cartId);

  if (!cart) {
    return null;
  }

  cart.items = cart.items.filter((item) => {
    return item.productVariant.toString() !== productVariantId.toString();
  });

  return await cart.save();
};

export default removeCartItemRepository;

import { getCartByIdRepository } from './index.js';

const updateCartItemRepository = async (
  cartId,
  productVariantId,
  quantity,
  price
) => {
  const cart = await getCartByIdRepository(cartId);

  if (!cart) {
    return null;
  }

  const cartItem = cart.items.find((item) => {
    return item.productVariant.toString() === productVariantId.toString();
  });

  if (!cartItem) {
    return null;
  }

  cartItem.quantity = quantity;
  cartItem.price = price;

  return await cart.save();
};

export default updateCartItemRepository;

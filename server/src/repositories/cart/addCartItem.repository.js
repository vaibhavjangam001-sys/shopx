import { getCartByIdRepository } from './index.js';

const addCartItemRepository = async (
  cartId,
  productVariantId,
  quantity,
  price
) => {
  const cart = await getCartByIdRepository(cartId);

  if (!cart) {
    return null;
  }

  const existingItem = cart.items.find((item) => {
    return item.productVariant.toString() === productVariantId.toString();
  });

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.price = price;
  } else {
    cart.items.push({
      productVariant: productVariantId,
      quantity,
      price,
    });
  }

  return await cart.save();
};

export default addCartItemRepository;

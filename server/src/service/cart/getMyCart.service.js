import { ApiError } from '../../utils/index.js';
import { getCartByUserIdRepository } from '../../repositories/cart/index.js';
import {} from '../../constants/index.js';

const getMyCartService = async (userId) => {
  const myCart = await getCartByUserIdRepository(userId);

  if (!myCart) {
    return {
      user: userId,
      items: [],
    };
  }

  return myCart;
};

export default getMyCartService;

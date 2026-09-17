import { Cart } from '../../models/index.js';

const createCartRepository = async (userId) => {
  return await Cart.create({
    user: userId,
    items: [],
  });
};

export default createCartRepository;

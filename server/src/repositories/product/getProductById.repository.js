import { Product } from '../../models/index.js';

const getProductByIdRepository = async (productId) => {
  return Product.findById(productId);
};

export default getProductByIdRepository;

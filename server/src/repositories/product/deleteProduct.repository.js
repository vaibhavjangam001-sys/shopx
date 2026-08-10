import { Product } from '../../models/index.js';

const deleteProductRepository = async (productId) => {
  return Product.findByIdAndDelete(productId);
};

export default deleteProductRepository;

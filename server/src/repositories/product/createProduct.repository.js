import { Product } from '../../models/index.js';

const createProductRepository = async (productData) => {
  return Product.create(productData);
};

export default createProductRepository;

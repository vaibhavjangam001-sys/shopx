import { Product } from '../../models/index.js';
console.log('repository create product');
const createProductRepository = async (productData) => {
  return Product.create(productData);
};

export default createProductRepository;

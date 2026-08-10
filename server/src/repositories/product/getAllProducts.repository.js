import { Product } from '../../models/index.js';

const getAllProductsRepository = async () => {
  return Product.find();
};

export default getAllProductsRepository;

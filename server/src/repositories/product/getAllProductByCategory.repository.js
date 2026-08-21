import { Product } from '../../models/index.js';

const getAllProductByCategoryRepository = (categoryId) => {
  return Product.findOne({ category: categoryId });
};

export default getAllProductByCategoryRepository;

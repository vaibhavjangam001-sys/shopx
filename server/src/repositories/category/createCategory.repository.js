import { Category } from '../../models/index.js';

const createCategoryRepository = async (categoryData) => {
  return Category.create(categoryData);
};

export default createCategoryRepository;

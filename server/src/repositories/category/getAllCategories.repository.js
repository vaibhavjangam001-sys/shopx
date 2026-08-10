import { Category } from '../../models/index.js';

const getAllCategoriesRepository = async () => {
  return Category.find();
};

export default getAllCategoriesRepository;

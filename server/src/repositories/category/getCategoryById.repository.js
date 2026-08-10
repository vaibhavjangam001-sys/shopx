import { Category } from '../../models/index.js';

const getCategoryByIdRepository = async (categoryId) => {
  return Category.findById(categoryId);
};

export default getCategoryByIdRepository;

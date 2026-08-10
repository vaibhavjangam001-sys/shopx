import { Category } from '../../models/index.js';

const deleteCategoryRepository = async (categoryId) => {
  return Category.findByIdAndDelete(categoryId);
};

export default deleteCategoryRepository;

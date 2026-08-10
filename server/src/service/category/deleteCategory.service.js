import { ApiError } from '../../utils/index.js';
import {
  deleteCategoryRepository,
  getCategoryByIdRepository,
} from '../../repositories/category/index.js';

const deleteCategoryService = async (categoryId) => {
  const existingCategory = await getCategoryByIdRepository(categoryId);

  if (!existingCategory) {
    throw new ApiError(404, 'Category not found.');
  }

  const deletedCategory = await deleteCategoryRepository(categoryId);

  if (!deletedCategory) {
    throw new ApiError(500, 'Failed to delete category.');
  }

  return deletedCategory;
};

export default deleteCategoryService;

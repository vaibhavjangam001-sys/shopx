import { ApiError } from '../../utils/index.js';
import { getCategoryByIdRepository } from '../../repositories/category/index.js';

const getCategoryByIdService = async (categoryId) => {
  const category = await getCategoryByIdRepository(categoryId);

  if (!category) {
    throw new ApiError(404, 'Category not found.');
  }

  return category;
};

export default getCategoryByIdService;

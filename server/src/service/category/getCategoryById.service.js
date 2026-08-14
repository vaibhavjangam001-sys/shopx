import { ApiError } from '../../utils/index.js';
import { getCategoryByIdRepository } from '../../repositories/category/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const getCategoryByIdService = async (categoryId) => {
  const category = await getCategoryByIdRepository(categoryId);

  if (!category) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.CATEGORY.NOT_FOUND);
  }

  return category;
};

export default getCategoryByIdService;

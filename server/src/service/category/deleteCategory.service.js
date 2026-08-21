import { ApiError } from '../../utils/index.js';
import {
  deleteCategoryRepository,
  getCategoryByIdRepository,
} from '../../repositories/category/index.js';
import { getAllProductByCategoryRepository } from '../../repositories/product/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const deleteCategoryService = async (categoryId) => {
  const existingCategory = await getCategoryByIdRepository(categoryId);

  if (!existingCategory) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.CATEGORY.NOT_FOUND);
  }

  const product = await getAllProductByCategoryRepository(categoryId);

  if (product) {
    throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.CATEGORY.HAS_PRODUCTS);
  }

  const deletedCategory = await deleteCategoryRepository(categoryId);

  if (!deletedCategory) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.CATEGORY.DELETE_FAILED
    );
  }

  return deletedCategory;
};

export default deleteCategoryService;

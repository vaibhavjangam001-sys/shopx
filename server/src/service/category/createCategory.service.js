import { ApiError } from '../../utils/index.js';
import {
  createCategoryRepository,
  findCategoryBySlugRepository,
} from '../../repositories/category/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const createCategoryService = async (categoryData) => {
  const { category, slug, description } = categoryData;

  const existingCategory = await findCategoryBySlugRepository(slug);

  if (existingCategory) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      MESSAGES.CATEGORY.SLUG_ALREADY_EXISTS
    );
  }

  const categoryDataToCreate = {
    category,
    slug,
    description,
  };

  const createdCategory = await createCategoryRepository(categoryDataToCreate);

  if (!createdCategory) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.CATEGORY.CREATE_FAILED
    );
  }

  return createdCategory;
};

export default createCategoryService;

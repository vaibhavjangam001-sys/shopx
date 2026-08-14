import { ApiError } from '../../utils/index.js';
import { findCategoryBySlugRepository } from '../../repositories/category/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const findCategoryBySlugService = async (slug) => {
  const category = await findCategoryBySlugRepository(slug);

  if (!category) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.CATEGORY.NOT_FOUND);
  }

  return category;
};

export default findCategoryBySlugService;

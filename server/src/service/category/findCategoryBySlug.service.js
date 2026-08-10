import { ApiError } from '../../utils/index.js';
import { findCategoryBySlugRepository } from '../../repositories/category/index.js';

const findCategoryBySlugService = async (slug) => {
  const category = await findCategoryBySlugRepository(slug);

  if (!category) {
    throw new ApiError(404, 'Category not found.');
  }

  return category;
};

export default findCategoryBySlugService;

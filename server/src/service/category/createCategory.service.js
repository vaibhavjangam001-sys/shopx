import { ApiError } from '../../utils/index.js';
import {
  createCategoryRepository,
  findCategoryBySlugRepository,
} from '../../repositories/category/index.js';

const createCategoryService = async (categoryData) => {
  const { category, slug, description } = categoryData;

  const existingCategory = await findCategoryBySlugRepository(slug);

  if (existingCategory) {
    throw new ApiError(409, 'Category with this slug already exists.');
  }

  const categoryDataToCreate = {
    category,
    slug,
    description,
  };

  const createdCategory = await createCategoryRepository(categoryDataToCreate);

  if (!createdCategory) {
    throw new ApiError(500, 'Failed to create category.');
  }

  return createdCategory;
};

export default createCategoryService;

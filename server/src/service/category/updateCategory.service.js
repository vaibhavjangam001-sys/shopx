import { ApiError } from '../../utils/index.js';
import {
  updateCategoryRepository,
  findCategoryBySlugRepository,
  getCategoryByIdRepository,
} from '../../repositories/category/index.js';

const updateCategoryService = async (categoryId, updateDetails) => {
  const existingCategory = await getCategoryByIdRepository(categoryId);

  if (!existingCategory) {
    throw new ApiError(404, 'Category not found.');
  }

  if (updateDetails.slug && updateDetails.slug !== existingCategory.slug) {
    const categoryWithSlug = await findCategoryBySlugRepository(
      updateDetails.slug
    );

    if (categoryWithSlug) {
      throw new ApiError(409, 'Category with this slug already exists.');
    }
  }

  const updatedCategory = await updateCategoryRepository(
    categoryId,
    updateDetails
  );

  if (!updateDetails) {
    throw new ApiError(500, 'Failed to update Category.');
  }

  return updatedCategory;
};

export default updateCategoryService;

import { ApiError } from '../../utils/index.js';
import {
  updateCategoryRepository,
  findCategoryBySlugRepository,
  getCategoryByIdRepository,
} from '../../repositories/category/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const updateCategoryService = async (categoryId, updateDetails) => {
  const existingCategory = await getCategoryByIdRepository(categoryId);

  if (!existingCategory) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.CATEGORY.NOT_FOUND);
  }

  if (updateDetails.slug && updateDetails.slug !== existingCategory.slug) {
    const categoryWithSlug = await findCategoryBySlugRepository(
      updateDetails.slug
    );

    if (categoryWithSlug) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        MESSAGES.CATEGORY.SLUG_ALREADY_EXISTS
      );
    }
  }

  const updatedCategory = await updateCategoryRepository(
    categoryId,
    updateDetails
  );

  if (!updatedCategory) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.CATEGORY.UPDATE_FAILED
    );
  }

  return updatedCategory;
};

export default updateCategoryService;

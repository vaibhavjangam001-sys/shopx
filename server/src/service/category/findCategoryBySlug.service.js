import { ApiError } from "../../utils/index.js";
import { findCategoryBySlugRepository } from "../../repositories/category/index.js";

const findCategoryBySlugService = async (slug) => {
  const categorySlug = await findCategoryBySlugRepository(slug);

  if (!categorySlug) {
    throw new ApiError(404, "Category not found.");
  }

  return categorySlug;
};

export default findCategoryBySlugService;

import { getAllCategoriesRepository } from '../../repositories/category/index.js';

const getAllCategoriesService = async (queryParams) => {
  const { categories, totalCategories, currentPage, limit } =
    await getAllCategoriesRepository(queryParams);

  const totalPages = Math.ceil(totalCategories / limit);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    categories,
    pagination: {
      totalCategories,
      totalPages,
      currentPage,
      limit,
      hasNextPage,
      hasPreviousPage,
    },
  };
};

export default getAllCategoriesService;

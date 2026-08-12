import { getAllProductsRepository } from '../../repositories/product/index.js';

const getAllProductsService = async (queryParams) => {
  const { products, totalProducts, currentPage, limit } =
    await getAllProductsRepository(queryParams);

  const totalPages = Math.ceil(totalProducts / limit);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    products,
    pagination: {
      totalProducts,
      totalPages,
      currentPage,
      limit,
      hasNextPage,
      hasPreviousPage,
    },
  };
};

export default getAllProductsService;

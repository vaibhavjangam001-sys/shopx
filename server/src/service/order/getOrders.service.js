import { getOrdersRepository } from '../../repositories/order/index.js';

const getOrdersService = async (userId, queryParams) => {
  const { orders, totalOrders, currentPage, limit } = await getOrdersRepository(
    userId,
    queryParams
  );

  const totalPages = Math.ceil(totalOrders / limit);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    orders,
    pagination: {
      totalOrders,
      totalPages,
      currentPage,
      limit,
      hasNextPage,
      hasPreviousPage,
    },
  };
};

export default getOrdersService;

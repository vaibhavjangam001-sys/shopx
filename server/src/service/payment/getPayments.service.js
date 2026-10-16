import { getPaymentsRepository } from '../../repositories/payment/index.js';

const getPaymentsService = async (queryParams) => {
  const { payments, totalPayments, page, limit } =
    await getPaymentsRepository(queryParams);

  const totalPages = Math.ceil(totalPayments / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    payments,
    pagination: {
      totalPayments,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage,
      hasPreviousPage,
    },
  };
};

export default getPaymentsService;

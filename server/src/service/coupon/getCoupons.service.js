import { getCouponsRepository } from '../../repositories/coupon/index.js';

const getCouponsService = async (queryParams) => {
  const { coupons, totalCoupons, currentPage, limit } =
    await getCouponsRepository(queryParams);

  const totalPages = Math.ceil(totalCoupons / limit);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    coupons,
    pagination: {
      totalCoupons,
      totalPages,
      currentPage,
      limit,
      hasNextPage,
      hasPreviousPage,
    },
  };
};

export default getCouponsService;

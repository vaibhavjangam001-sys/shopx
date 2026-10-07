import { Coupon } from '../../models/index.js';
import { ApiFeatures } from '../../utils/index.js';

const getCouponsRepository = async (queryParams = {}) => {
  const filter = {
    isDeleted: false,
  };

  const discountType = queryParams?.discountType?.trim().toUpperCase();

  if (discountType) {
    filter.discountType = discountType;
  }

  if (queryParams?.isActive !== undefined) {
    filter.isActive = queryParams.isActive === 'true';
  }

  const keyword = queryParams?.keyword?.trim();

  if (keyword) {
    filter.code = {
      $regex: keyword,
      $options: 'i',
    };
  }

  const totalCoupons = await Coupon.countDocuments(filter);
  const baseQuery = Coupon.find(filter);

  const feature = new ApiFeatures(baseQuery, queryParams)
    .sort(['createdAt', 'discountValue', 'expiryDate'])
    .paginate();

  const coupons = await feature.query;

  return {
    coupons,
    totalCoupons,
    currentPage: feature.page,
    limit: feature.limit,
  };
};

export default getCouponsRepository;

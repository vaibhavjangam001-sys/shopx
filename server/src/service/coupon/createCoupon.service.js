import { ApiError } from '../../utils/index.js';
import { createCouponRepository } from '../../repositories/coupon/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const createCouponService = async (couponData) => {
  const {
    code,
    discountType,
    discountValue,
    minOrderAmount,
    maxDiscount,
    startDate,
    expiryDate,
    usageLimit,
    perUserLimit,
  } = couponData;

  if (discountType === 'PERCENTAGE' && discountValue > 100) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.COUPON.INVALID_DISCOUNT_VALUE
    );
  }

  if (discountType === 'FIXED' && discountValue <= 0) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.COUPON.INVALID_DISCOUNT_VALUE
    );
  }

  if (new Date(expiryDate) <= new Date(startDate)) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.COUPON.INVALID_DATE_RANGE
    );
  }

  if (
    discountType === 'FIXED' &&
    maxDiscount !== null &&
    maxDiscount !== undefined
  ) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.COUPON.INVALID_MAX_DISCOUNT
    );
  }

  const newCouponData = {
    code,
    discountType,
    discountValue,
    minOrderAmount,
    maxDiscount: discountType === 'PERCENTAGE' ? (maxDiscount ?? null) : null,
    startDate,
    expiryDate,
    usageLimit: usageLimit ?? null,
    perUserLimit: perUserLimit ?? 1,
  };

  return await createCouponRepository(newCouponData);
};

export default createCouponService;

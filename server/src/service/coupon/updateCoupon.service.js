import { ApiError } from '../../utils/index.js';
import {
  getCouponByIdRepository,
  updateCouponRepository,
} from '../../repositories/coupon/index.js';
import { API_FEATURES, HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const updateCouponService = async (couponId, updateData) => {
  const coupon = await getCouponByIdRepository(couponId);

  if (!coupon) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.COUPON.NOT_FOUND);
  }

  const updatedData = {
    ...coupon.toObject(),
    ...updateData,
  };

  if (
    updatedData.discountType === 'PERCENTAGE' &&
    updatedData.discountValue > 100
  ) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.COUPON.INVALID_DISCOUNT_VALUE
    );
  }

  if (updatedData.discountType === 'FIXED') {
    updatedData.maxDiscount = null;
  }

  if (new Date(updatedData.expiryDate) <= new Date(updatedData.startDate)) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.COUPON.INVALID_DATE_RANGE
    );
  }

  const updatePayload = {};

  for (const field of API_FEATURES.COUPON_ALLOWED_FIELDS) {
    if (updateData[field] !== undefined) {
      updatePayload[field] = updatedData[field];
    }
  }

  const newUpdatedData = await updateCouponRepository(couponId, updatePayload);

  if (!newUpdatedData) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.COUPON.UPDATE_FAILED
    );
  }

  return newUpdatedData;
};

export default updateCouponService;

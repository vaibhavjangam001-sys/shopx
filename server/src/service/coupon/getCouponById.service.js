import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getCouponByIdRepository } from '../../repositories/coupon/index.js';

const getCouponByIdService = async (couponId) => {
  const coupon = await getCouponByIdRepository(couponId);

  if (!coupon) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.COUPON.NOT_FOUND);
  }

  return coupon;
};

export default getCouponByIdService;

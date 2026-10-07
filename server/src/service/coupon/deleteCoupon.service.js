import { ApiError } from '../../utils/index.js';
import {
  deleteCouponRepository,
  getCouponByIdRepository,
} from '../../repositories/coupon/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const deleteCouponService = async (couponId) => {
  const coupon = await getCouponByIdRepository(couponId);

  if (!coupon) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.COUPON.NOT_FOUND);
  }

  const deletedCoupon = await deleteCouponRepository(couponId);

  if (!deletedCoupon) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.COUPON.DELETE_FAILED
    );
  }

  return deletedCoupon;
};

export default deleteCouponService;

import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { deleteCouponService } from '../../service/coupon/index.js';

const deleteCouponController = AsyncHandler(async (req, res) => {
  const { couponId } = req.params;

  const deletedCoupon = await deleteCouponService(couponId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, deletedCoupon, MESSAGES.COUPON.DELETED)
    );
});

export default deleteCouponController;

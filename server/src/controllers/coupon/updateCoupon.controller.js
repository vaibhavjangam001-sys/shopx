import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { updateCouponService } from '../../service/coupon/index.js';

const updateCouponController = AsyncHandler(async (req, res) => {
  const { couponId } = req.params;
  const updateData = req.body;

  const updatedCoupon = await updateCouponService(couponId, updateData);
  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, updatedCoupon, MESSAGES.COUPON.UPDATED)
    );
});

export default updateCouponController;

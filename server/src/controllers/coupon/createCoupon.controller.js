import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { createCouponService } from '../../service/coupon/index.js';

const createCouponController = AsyncHandler(async (req, res) => {
  const couponData = req.body;
  const createdCoupon = await createCouponService(couponData);

  res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        createdCoupon,
        MESSAGES.COUPON.CREATED
      )
    );
});

export default createCouponController;

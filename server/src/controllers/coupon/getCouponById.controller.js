import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getCouponByIdService } from '../../service/coupon/index.js';

const getCouponByIdController = AsyncHandler(async (req, res) => {
  const { couponId } = req.params;

  const coupon = await getCouponByIdService(couponId);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, coupon, MESSAGES.COUPON.FETCHED));
});

export default getCouponByIdController;

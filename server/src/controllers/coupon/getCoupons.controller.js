import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { getCouponsService } from '../../service/coupon/index.js';

const getCouponsController = AsyncHandler(async (req, res) => {
  const queryParams = req.query;
  const coupons = await getCouponsService(queryParams);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, coupons, MESSAGES.COUPON.FETCHED_ALL)
    );
});

export default getCouponsController;

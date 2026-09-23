import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getOrderByIdService } from '../../service/order/index.js';

const getOrderByIdController = AsyncHandler(async (req, res) => {
  const orderId = req.params.orderId;

  const order = await getOrderByIdService(orderId);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, order, MESSAGES.ORDER.FETCHED));
});

export default getOrderByIdController;

import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getOrdersService } from '../../service/order/index.js';

const getOrdersController = AsyncHandler(async (req, res) => {
  const orders = await getOrdersService();

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, orders, MESSAGES.ORDER.FETCHED_ALL));
});

export default getOrdersController;

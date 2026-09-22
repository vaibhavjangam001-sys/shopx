import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { createOrderService } from '../../service/order/index.js';

const createOrderController = AsyncHandler(async (req, res) => {
  const order = await createOrderService(req.body);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, order, MESSAGES.ORDER.CREATED));
});

export default createOrderController;

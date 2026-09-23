import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { createOrderService } from '../../service/order/index.js';

const createOrderController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { orderData } = req.body;

  const order = await createOrderService(userId, orderData);

  res
    .status(HTTP_STATUS.CREATED)
    .json(new ApiResponse(HTTP_STATUS.CREATED, order, MESSAGES.ORDER.CREATED));
});

export default createOrderController;

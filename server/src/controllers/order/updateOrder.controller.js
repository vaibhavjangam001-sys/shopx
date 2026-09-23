import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { updateOrderService } from '../../service/order/index.js';

const updateOrderController = AsyncHandler(async (req, res) => {
  const orderId = req.params.orderId;
  const updateData = req.body;

  const updatedOrder = await updateOrderService(orderId, updateData);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, updatedOrder, MESSAGES.ORDER.UPDATED)
    );
});

export default updateOrderController;

import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { deleteOrderService } from '../../service/order/index.js';

const deleteOrderController = AsyncHandler(async (req, res) => {
  const orderId = req.params.orderId;

  const deletedOrder = await deleteOrderService(orderId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, deletedOrder, MESSAGES.ORDER.DELETED)
    );
});

export default deleteOrderController;

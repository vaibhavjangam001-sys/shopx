import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { updateOrderService } from '../../service/order/index.js';

const updateOrderController = AsyncHandler(async (req, res) => {
  const orderId = req.params.orderId;
  const userId = req.user.id;
  const userRole = req.user.role;
  const updateData = {
    status: req.body.status,
  };

  const updatedOrder = await updateOrderService(
    userId,
    orderId,
    updateData,
    userRole
  );

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, updatedOrder, MESSAGES.ORDER.UPDATED)
    );
});

export default updateOrderController;

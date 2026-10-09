import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { createRazorpayOrderService } from '../../service/payment/index.js';

const createRazorpayOrderController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { orderId } = req.params;

  const paymentData = await createRazorpayOrderService(userId, orderId);

  res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        paymentData,
        MESSAGES.PAYMENT.CREATED
      )
    );
});

export default createRazorpayOrderController;

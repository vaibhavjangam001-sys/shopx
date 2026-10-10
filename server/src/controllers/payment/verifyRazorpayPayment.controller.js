import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { verifyRazorpayPaymentService } from '../../service/payment/index.js';

const verifyRazorpayPaymentController = AsyncHandler(async (req, res) => {
  const userPaymentData = {
    userId: req.user.id,
    ...req.body,
  };

  const paymentData = await verifyRazorpayPaymentService(userPaymentData);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, paymentData, MESSAGES.PAYMENT.VERIFIED)
    );
});

export default verifyRazorpayPaymentController;

import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getPaymentByIdService } from '../../service/payment/index.js';

const getPaymentByIdController = AsyncHandler(async (req, res) => {
  const { paymentId } = req.params;

  const payment = await getPaymentByIdService(paymentId);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, payment, MESSAGES.PAYMENT.FETCHED));
});

export default getPaymentByIdController;

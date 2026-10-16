import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getPaymentsService } from '../../service/payment/index.js';

const getPaymentsController = AsyncHandler(async (req, res) => {
  const payments = await getPaymentsService(req.query);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, payments, MESSAGES.PAYMENT.FETCHED_ALL)
    );
});

export default getPaymentsController;

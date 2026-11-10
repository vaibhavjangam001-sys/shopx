import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { createRefundService } from '../../service/refund/index.js';

const createRefundController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { paymentId, amount, reason } = req.body;

  const refund = await createRefundService(userId, paymentId, amount, reason);

  res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(HTTP_STATUS.CREATED, refund, MESSAGES.REFUND.CREATED)
    );
});

export default createRefundController;

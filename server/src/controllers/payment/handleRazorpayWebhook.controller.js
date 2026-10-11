import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { handleRazorpayWebhookService } from '../../service/payment/index.js';

const handleRazorpayWebhookController = AsyncHandler(async (req, res) => {
  const webhookEvent = JSON.parse(req.body.toString('utf8'));

  const result = await handleRazorpayWebhookService(webhookEvent);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, result, MESSAGES.PAYMENT.SUCCESS));
});

export default handleRazorpayWebhookController;

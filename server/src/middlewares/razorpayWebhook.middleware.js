import { HTTP_STATUS, MESSAGES } from '../constants/index.js';
import { ApiError, verifyRazorpayWebhookSignature } from '../utils/index.js';

const razorpayWebhookMiddleware = (req, res, next) => {
  try {
    const signature = req.get('X-Razorpay-Signature');

    const isValid = verifyRazorpayWebhookSignature(req.body, signature);

    if (!isValid) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.RAZORPAY.INVALID_WEBHOOK
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default razorpayWebhookMiddleware;

import { Router } from 'express';
import { ROLES } from '../../constants/index.js';
import {
  authenticationMiddleware,
  authorizeMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';
import {
  createRazorpayOrderValidator,
  verifyRazorpayPaymentValidator,
} from '../../validators/payment/index.js';
import {
  createRazorpayOrderController,
  verifyRazorpayPaymentController,
} from '../../controllers/payment/index.js';

const paymentRouter = Router();

//verify razorpay signature
paymentRouter.post(
  '/verify',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN, ROLES.USER),
  verifyRazorpayPaymentValidator,
  validationMiddleware,
  verifyRazorpayPaymentController
);

export default paymentRouter;

// create razorpay order
paymentRouter.post(
  '/:orderId',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN, ROLES.USER),
  createRazorpayOrderValidator,
  validationMiddleware,
  createRazorpayOrderController
);

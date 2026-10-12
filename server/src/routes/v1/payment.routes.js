import { Router } from 'express';
import { ROLES } from '../../constants/index.js';
import {
  authenticationMiddleware,
  authorizeMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';
import {
  createRazorpayOrderValidator,
  getPaymentByIdValidator,
  verifyRazorpayPaymentValidator,
} from '../../validators/payment/index.js';
import {
  createRazorpayOrderController,
  getPaymentByIdController,
  verifyRazorpayPaymentController,
} from '../../controllers/payment/index.js';

const paymentRouter = Router();

// get payment by ID
paymentRouter.get(
  '/:paymentId',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  getPaymentByIdValidator,
  validationMiddleware,
  getPaymentByIdController
);

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

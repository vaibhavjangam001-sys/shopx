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
  paymentsQueryValidator,
  verifyRazorpayPaymentValidator,
} from '../../validators/payment/index.js';
import {
  createRazorpayOrderController,
  getPaymentByIdController,
  getPaymentsController,
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

// create razorpay order
paymentRouter.post(
  '/:orderId',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN, ROLES.USER),
  createRazorpayOrderValidator,
  validationMiddleware,
  createRazorpayOrderController
);

// get all payments
paymentRouter.get(
  '/',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  paymentsQueryValidator,
  validationMiddleware,
  getPaymentsController
);

// get payment by ID
paymentRouter.get(
  '/:paymentId',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  getPaymentByIdValidator,
  validationMiddleware,
  getPaymentByIdController
);

export default paymentRouter;

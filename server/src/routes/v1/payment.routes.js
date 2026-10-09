import { Router } from 'express';
import { ROLES } from '../../constants/index.js';
import {
  authenticationMiddleware,
  authorizeMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';
import { createRazorpayOrderValidator } from '../../validators/payment/index.js';
import { createRazorpayOrderController } from '../../controllers/payment/index.js';

const paymentRouter = Router();

// create razorpay order
paymentRouter.post(
  '/:orderId',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN, ROLES.USER),
  createRazorpayOrderValidator,
  validationMiddleware,
  createRazorpayOrderController
);

export default paymentRouter;

import { Router } from 'express';
import { createCouponController } from '../../controllers/coupon/index.js';
import {
  authenticationMiddleware,
  authorizeMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';
import { createCouponValidator } from '../../validators/Coupon/index.js';
import { ROLES } from '../../constants/index.js';

const couponRouter = Router();

// Create coupon
couponRouter.post(
  '/',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  createCouponValidator,
  validationMiddleware,
  createCouponController
);

export default couponRouter;

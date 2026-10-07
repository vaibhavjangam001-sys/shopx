import { Router } from 'express';
import {
  createCouponController,
  getCouponByIdController,
  getCouponsController,
  updateCouponController,
  deleteCouponController,
} from '../../controllers/coupon/index.js';
import {
  authenticationMiddleware,
  authorizeMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';
import {
  couponQueryValidator,
  createCouponValidator,
  getCouponByIdValidator,
  updateCouponValidator,
  deleteCouponValidator,
} from '../../validators/coupon/index.js';
import { ROLES } from '../../constants/index.js';

const couponRouter = Router();

// Get all coupons
couponRouter.get(
  '/',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  couponQueryValidator,
  validationMiddleware,
  getCouponsController
);

// Get coupon by ID
couponRouter.get(
  '/:couponId',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  getCouponByIdValidator,
  validationMiddleware,
  getCouponByIdController
);

// Create coupon
couponRouter.post(
  '/',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  createCouponValidator,
  validationMiddleware,
  createCouponController
);

// Update coupon
couponRouter.patch(
  '/:couponId',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  updateCouponValidator,
  validationMiddleware,
  updateCouponController
);

// Delete coupon
couponRouter.delete(
  '/:couponId',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  deleteCouponValidator,
  validationMiddleware,
  deleteCouponController
);

export default couponRouter;

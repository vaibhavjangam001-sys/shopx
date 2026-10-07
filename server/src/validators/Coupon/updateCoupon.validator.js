import { body, param } from 'express-validator';
import { API_FEATURES } from '../../constants/index.js';

const updateCouponValidator = [
  param('couponId')
    .trim()
    .notEmpty()
    .withMessage('Coupon ID is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid Coupon ID.'),

  body('discountType')
    .optional()
    .trim()
    .toUpperCase()
    .isIn(API_FEATURES.COUPON_TYPES)
    .withMessage('Invalid coupon type'),

  body('discountValue')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Discount value must be greater than 0.'),

  body('minOrderAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum order amount cannot be negative.'),

  body('maxDiscount')
    .optional({ nullable: true })
    .isFloat({ gt: 0 })
    .withMessage('Maximum discount must be greater than zero.'),

  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Coupon start date must be a valid date.'),

  body('expiryDate')
    .optional()
    .isISO8601()
    .withMessage('Coupon expiry date must be a valid date.'),

  body('usageLimit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Coupon usage limit must be at least 1.'),

  body('perUserLimit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Per-user limit must be at least 1.'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be true or false'),
];

export default updateCouponValidator;

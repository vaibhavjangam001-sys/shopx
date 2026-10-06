import { body } from 'express-validator';
import { REGEX } from '../../constants/index.js';
import { API_FEATURES } from '../../constants/index.js';

const createCouponValidator = [
  body('code')
    .trim()
    .notEmpty()
    .withMessage('Coupon code required.')
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage('Coupon code must be between 3 and 50 characters.')
    .bail()
    .matches(REGEX.COUPON_REGEX)
    .withMessage('Coupon code contains invalid characters.'),

  body('discountType')
    .trim()
    .notEmpty()
    .withMessage('Dicount type is required.')
    .bail()
    .toUpperCase()
    .isIn(API_FEATURES.COUPON_TYPES)
    .withMessage('Invalid discount type.'),

  body('discountValue')
    .notEmpty()
    .withMessage('Discount value is required.')
    .bail()
    .isFloat({ min: 0 })
    .withMessage('Discount value must be a positeve number.'),

  body('minOrderAmount')
    .notEmpty()
    .withMessage('Minimum order amount is required.')
    .bail()
    .isFloat({ min: 0 })
    .withMessage('minimum order amount must be a positeve number.'),

  body('maxDiscount')
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage('Maximum discount must be a positive number.'),

  body('startDate')
    .notEmpty()
    .withMessage('Coupon start date is required.')
    .bail()
    .isISO8601()
    .withMessage('Invalid coupon start date.'),

  body('expiryDate')
    .notEmpty()
    .withMessage('Coupon expiry date is required.')
    .bail()
    .isISO8601()
    .withMessage('Invalid coupon expiry date.'),

  body('usageLimit')
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage('Coupon usage limit must be at least 1.'),

  body('perUserLimit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Per-user limit must be at least 1.'),
];

export default createCouponValidator;

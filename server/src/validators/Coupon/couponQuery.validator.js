import { query } from 'express-validator';
import { API_FEATURES } from '../../constants/index.js';

const couponQueryValidator = [
  query('keyword')
    .optional()
    .trim()
    .isString()
    .withMessage('Keyword must be a string.'),

  query('discountType')
    .optional()
    .trim()
    .toUpperCase()
    .isIn(API_FEATURES.COUPON_TYPES)
    .withMessage('Invalid coupon type.'),

  query('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be true or false.'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a posivtive integer.'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100.'),
];

export default couponQueryValidator;

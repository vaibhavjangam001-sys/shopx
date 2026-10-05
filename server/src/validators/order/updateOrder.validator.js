import { param, body } from 'express-validator';
import { API_FEATURES } from '../../constants/index.js';

const updateOrderValidator = [
  param('orderId')
    .trim()
    .notEmpty()
    .withMessage('Order ID is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid order ID.'),

  body('status')
    .trim()
    .notEmpty()
    .withMessage('Order status is required.')
    .bail()
    .toUpperCase()
    .isIn(API_FEATURES.ALLOWED_ORDER_STATUSES)
    .withMessage('Invalid order status.'),
];

export default updateOrderValidator;

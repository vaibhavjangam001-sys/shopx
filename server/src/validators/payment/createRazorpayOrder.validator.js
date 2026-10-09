import { param } from 'express-validator';

const createRazorpayOrderValidator = [
  param('orderId')
    .trim()
    .notEmpty()
    .withMessage('Order ID is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid order ID'),
];

export default createRazorpayOrderValidator;

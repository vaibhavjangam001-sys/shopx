import { param } from 'express-validator';

const getPaymentByIdValidator = [
  param('paymentId')
    .trim()
    .notEmpty()
    .withMessage('Payment ID is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid payment Id.'),
];

export default getPaymentByIdValidator;

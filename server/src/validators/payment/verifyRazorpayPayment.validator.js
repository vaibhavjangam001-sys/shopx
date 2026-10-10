import { body } from 'express-validator';

const verifyRazorpayPaymentValidator = [
  body('razorpay_order_id')
    .trim()
    .notEmpty()
    .withMessage('Razorpay order ID is required.')
    .bail()
    .isString()
    .withMessage('Invalid razorpay order ID.'),

  body('razorpay_payment_id')
    .trim()
    .notEmpty()
    .withMessage('Razorpay payment ID is required.')
    .bail()
    .isString()
    .withMessage('Invalid razorpay payment ID.'),

  body('razorpay_signature')
    .trim()
    .notEmpty()
    .withMessage('Razorpay signature is required.')
    .bail()
    .matches(/^[a-f0-9]{64}$/i)
    .withMessage('Invalid Razorpay signature format.'),
];

export default verifyRazorpayPaymentValidator;

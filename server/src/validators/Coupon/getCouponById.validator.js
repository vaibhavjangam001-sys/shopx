import { param } from 'express-validator';

const getCouponByIdValidator = [
  param('couponId')
    .trim()
    .notEmpty()
    .withMessage('Coupon ID is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid coupon ID.'),
];

export default getCouponByIdValidator;

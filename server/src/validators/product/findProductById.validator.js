import { param } from 'express-validator';

const findProductByIdValidator = [
  param('productId')
    .trim()
    .notEmpty()
    .withMessage('Product id is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid product id.'),
];

export default findProductByIdValidator;

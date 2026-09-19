import { param } from 'express-validator';

const wishlistValidator = [
  param('productId')
    .notEmpty()
    .withMessage('Product ID is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid product iD.'),
];

export default wishlistValidator;

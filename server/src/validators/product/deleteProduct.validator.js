import { param } from 'express-validator';

const deleteProductValidator = [
  param('productId')
    .notEmpty()
    .withMessage('Product id is Required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid product id.'),
];

export default deleteProductValidator;

import { param, body } from 'express-validator';

const productVariantStockValidator = [
  param('productVariantId')
    .notEmpty()
    .withMessage('Product variant id is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid Product variant id.'),

  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required.')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Quantity must be positive integer.'),
];

export default productVariantStockValidator;

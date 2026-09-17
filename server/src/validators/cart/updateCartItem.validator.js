import { body } from 'express-validator';

const updateCartItemValidator = [
  body('productVariantId')
    .notEmpty()
    .withMessage('Product variant ID is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid Product variant ID.'),

  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required.')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer.'),
];

export default updateCartItemValidator;

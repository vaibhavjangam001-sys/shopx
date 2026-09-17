import { body } from 'express-validator';

const removeCartItemValidator = [
  body('productVariantId')
    .notEmpty()
    .withMessage('Product variant ID is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid product variant ID.'),
];

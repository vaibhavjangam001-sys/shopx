import { param } from 'express-validator';

const deleteProductVariantValidator = [
  param('productVariantId')
    .notEmpty()
    .withMessage('Product variant id is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid product variant id.'),
];

export default deleteProductVariantValidator;

import { param } from 'express-validator';

const getProductVariantByIdValidator = [
  param('productVariantId')
    .notEmpty()
    .withMessage('Product variant id is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid Product variant id.'),
];

export default getProductVariantByIdValidator;

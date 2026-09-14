import { param, body } from 'express-validator';

const updateProductVariantValidator = [
  param('productVariantId')
    .notEmpty()
    .withMessage('Prodcut variant id is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid product variant id.'),

  body('sku')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Product variant SKU cannot be empty.'),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Prodcut variant price must be valid positive number.'),

  body('discountPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      'Prodcut variant discount price must be valid positive number.'
    ),

  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Product variant stock must be valid positive number.'),

  body('attributes')
    .optional()
    .isObject()
    .withMessage('Attributes must be an object.'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean.'),
];

export default updateProductVariantValidator;

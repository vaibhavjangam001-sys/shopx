import { param, body } from 'express-validator';

const createProductVariantValidator = [
  param('productId')
    .notEmpty()
    .withMessage('Product id is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid product id.'),

  body('sku')
    .notEmpty()
    .withMessage('Variant SKU is required.')
    .bail()
    .isString()
    .withMessage('Variant SKU must be a string.')
    .bail()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Variant SKU length must be between 2 and 50 characters.'),

  body('price')
    .notEmpty()
    .withMessage('Variant price required.')
    .bail()
    .isFloat({ min: 0 })
    .withMessage('Variant price must be a non-negative number.'),

  body('discountPrice')
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage('Variant discount price must be a non-negative number'),

  body('stock')
    .notEmpty()
    .withMessage('Variant stock is required.')
    .bail()
    .isInt({ min: 0 })
    .withMessage('Variant stock must be a non-negative number'),

  body('attributes')
    .notEmpty()
    .withMessage('Variant attributes are required.')
    .bail()
    .isObject()
    .withMessage('Variant attributes must be an object.'),
];

export default createProductVariantValidator;

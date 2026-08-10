import { body } from 'express-validator';

const updateProductValidator = [
  body('productName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage('Product name must be between 2 and 150 characters.'),

  body('slug')
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage('Product slug must be between 2 and 150 characters.')
    .bail()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage(
      'Slug must contain only lowercase letters, numbers, and hyphens.'
    ),

  body('sku')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Product SKU must be between 2 and 100 characters.')
    .bail()
    .matches(/^[A-Za-z0-9-]+$/)
    .withMessage('SKU can contain only letters, numbers, and hyphens.'),

  body('brand')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Brand must be between 2 and 100 characters.'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Description must be between 10 and 5000 characters.'),

  body('category')
    .optional()
    .trim()
    .isMongoId()
    .withMessage('Invalid category ID.'),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number.'),

  body('discountPrice')
    .optional({ values: 'null' })
    .isFloat({ min: 0 })
    .withMessage('Discount price must be a non-negative number.'),

  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer.'),

  body('status')
    .optional()
    .isIn(['draft', 'active', 'inactive'])
    .withMessage('Status must be draft, active, or inactive.'),

  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean.'),
];

export default updateProductValidator;

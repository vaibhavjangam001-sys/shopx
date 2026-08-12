import { query } from 'express-validator';

const productQueryValidator = [
  query('category').optional().isMongoId().withMessage('Invalid category Id'),

  query('brand')
    .optional()
    .trim()
    .isString()
    .withMessage('brand must be string')
    .isLength({ min: 1, max: 50 })
    .withMessage('brand must be between 1 and 50 characters'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('limit must be an integer between 1 and 100'),

  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('minPrice must be a number greater than or equal to 0'),

  query('minRating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('minRating must be a number between 0 and 5'),

  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('maxPrice must be a number greater than or equal to 0')
    .custom((maxPrice, { req }) => {
      if (
        req.query.minPrice !== undefined &&
        Number(req.query.minPrice) > Number(maxPrice)
      ) {
        throw new Error('maxPrice must be greater than or equal to minPrice');
      }

      return true;
    }),

  query('sort')
    .optional()
    .custom((value) => {
      const allowedFields = ['price', 'rating', 'productName', 'createdAt'];
      const sortFields = value.split(',');

      const areValid = sortFields.every((field) => {
        const fieldName = field.startsWith('-') ? field.slice(1) : field;
        return allowedFields.includes(fieldName);
      });

      if (!areValid) {
        throw new Error('fields contains an invalid fields');
      }

      return true;
    }),

  query('fields')
    .optional()
    .custom((value) => {
      const allowedFields = [
        'productName',
        'price',
        'discountPrice',
        'rating',
        'numOfReviews',
        'images',
        'description',
      ];

      const fieldArray = value.split(',');

      const areValid = fieldArray.every((field) => {
        return allowedFields.includes(field);
      });

      if (!areValid) {
        throw new Error('fields contains an invalid fields');
      }

      return true;
    }),

  query('status')
    .optional()
    .isIn(['active', 'draft', 'inactive'])
    .withMessage('Invalid product status'),

  query('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean'),
];

export default productQueryValidator;

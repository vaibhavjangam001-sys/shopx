import { query } from 'express-validator';
import { API_FEATURES } from '../../constants/index.js';

const orderQueryValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer.'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100.'),

  query('status')
    .optional()
    .trim()
    .toUpperCase()
    .isIn(API_FEATURES.ALLOWED_ORDER_STATUSES)
    .withMessage('Invalid order status.'),

  query('sort')
    .optional()
    .custom((value) => {
      const sortFields = value.split(',');

      const areValid = sortFields.every((field) => {
        const fieldName = field.startsWith('-') ? field.slice(1) : field;
        return API_FEATURES.ORDER_SORT_FIELDS.includes(fieldName);
      });

      if (!areValid) {
        throw new Error('sort contains an invalid field');
      }

      return true;
    }),
];

export default orderQueryValidator;

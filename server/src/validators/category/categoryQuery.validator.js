import { query } from 'express-validator';
import { API_FEATURERS } from '../../constants/index.js';

const categoryQueryValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer.'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100.'),

  query('keyword')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Keyword must not exceed 100 characters'),

  query('sort')
    .optional()
    .custom((value) => {
      const sortFields = value.split(',');

      const areValid = sortFields.every((field) => {
        const fieldName = field.startsWith('-') ? field.slice(1) : field;

        return API_FEATURERS.CATEGORY_SORT_FIELDS.includes(fieldName);
      });

      if (!areValid) {
        throw new Error('sort contains an invalid field');
      }

      return true;
    }),

  query('fields')
    .optional()
    .custom((value) => {
      const fieldArray = value.split(',');

      const areValidField = fieldArray.every((field) => {
        return API_FEATURERS.CATEGORY_FIELDS.includes(field);
      });

      if (!areValidField) {
        throw new Error('fields contains an invalid field');
      }

      return true;
    }),
];

export default categoryQueryValidator;

import { query } from 'express-validator';

const userQueryValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be  a positive integer.'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be a integer and between 1 and 100.'),

  query('sort')
    .optional()
    .custom((value) => {
      const allowedFields = ['firstName', 'lastName', 'createdAt'];
      const sortFields = value.split(',');

      const areValid = sortFields.every((field) => {
        const fieldName = field.startsWith('-') ? field.slice(1) : field;

        return allowedFields.includes(fieldName);
      });

      if (!areValid) {
        throw new Error('Sort contains an invalid fields.');
      }

      return true;
    }),
];

export default userQueryValidator;

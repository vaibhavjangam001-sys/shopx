import { query } from 'express-validator';
import { REGEX } from '../../constants/index.js';

const userQueryValidator = [
  query('firstName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('First name is required.')
    .bail()
    .isLength({ min: 1, max: 50 })
    .withMessage('firstName must be between 1 and 50 characters'),

  query('lastName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('First name is required.')
    .bail()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters'),

  query('phone')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Phone number is required.')
    .bail()
    .matches(REGEX.PHONE_REGEX)
    .withMessage('Invalid phone number.'),

  query('email')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .bail()
    .matches(REGEX.EMAIL_REGEX)
    .withMessage('Invalid email'),

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

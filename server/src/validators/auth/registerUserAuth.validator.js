import { body } from 'express-validator';
import { REGEX } from '../../constants/index.js';

const registerUserAuthValidator = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required.')
    .bail()
    .isLength({ min: 2, max: 20 })
    .withMessage('First name must be between 2 and 20 characters.'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required.')
    .bail()
    .isLength({ min: 2, max: 20 })
    .withMessage('Last name must be between 2 and 20 characters.'),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required.')
    .bail()
    .matches(REGEX.PHONE_REGEX)
    .withMessage('Invalid phone number.'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .bail()
    .matches(REGEX.EMAIL_REGEX)
    .withMessage('Invalid email'),

  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .bail()
    .isLength({ min: 8, max: 24 })
    .withMessage('Password must be between 8 and 24 characters.')
    .bail()
    .matches(REGEX.PASSWORD_REGEX)
    .withMessage(
      'Please enter a strong password using uppercase, lowercase, digits and special characters.'
    ),
];

export default registerUserAuthValidator;

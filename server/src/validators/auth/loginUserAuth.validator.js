import { body } from 'express-validator';
import { REGEX } from '../../constants/index.js';

const loginUserAuthValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .bail()
    .matches(REGEX.EMAIL_REGEX)
    .withMessage('Invalid email.'),

  body('password').notEmpty().withMessage('Password is required.'),
];

export default loginUserAuthValidator;

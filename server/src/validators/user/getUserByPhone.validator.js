import { param } from 'express-validator';
import { REGEX } from '../../constants/index.js';

const getUserByPhoneValidator = [
  param('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required.')
    .bail()
    .matches(REGEX.PHONE_REGEX)
    .withMessage('Invalid phone number.'),
];

export default getUserByPhoneValidator;

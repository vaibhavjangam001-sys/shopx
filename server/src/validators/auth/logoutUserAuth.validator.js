import { body } from 'express-validator';

const logoutUserAuthValidator = [
  body('refreshToken')
    .isString()
    .withMessage('Refresh Token must be a string.')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Refresh token is required.'),
];

export default logoutUserAuthValidator;

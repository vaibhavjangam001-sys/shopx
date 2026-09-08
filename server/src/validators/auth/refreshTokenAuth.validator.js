import { body } from 'express-validator';

const refreshTokenAuthValidator = [
  body('refreshToken')
    .isString()
    .withMessage('Refersh tokem must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Refresh token is required'),
];

export default refreshTokenAuthValidator;

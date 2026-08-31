import { param } from 'express-validator';

const getUserByIdValidator = [
  param('userId')
    .notEmpty()
    .withMessage('User ID is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid user ID.'),
];

export default getUserByIdValidator;

import { param } from 'express-validator';

const setDefaultAddressValidator = [
  param('addressId')
    .trim()
    .notEmpty()
    .withMessage('Address ID is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid address ID.'),
];

export default setDefaultAddressValidator;

import { param } from 'express-validator';

const deleteAddressValidator = [
  param('addressId')
    .trim()
    .notEmpty()
    .withMessage('Address ID is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid address ID.'),
];

export default deleteAddressValidator;

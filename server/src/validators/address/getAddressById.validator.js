import { param } from 'express-validator';

const getAddressByIdValidator = [
  param('addressId')
    .trim()
    .notEmpty()
    .withMessage('Address ID is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid address id.'),
];

export default getAddressByIdValidator;

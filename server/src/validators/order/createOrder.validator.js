import { body } from 'express-validator';

const createOrderValidator = [
  body('orderData')
    .exists()
    .withMessage('Order data is required.')
    .bail()
    .isObject()
    .withMessage('Order data must be an object.'),

  body('orderData.addressId')
    .exists()
    .withMessage('Address ID is required.')
    .bail()
    .notEmpty()
    .withMessage('Address ID cannot be empty.')
    .bail()
    .isMongoId()
    .withMessage('Invalid address ID.'),
];

export default createOrderValidator;

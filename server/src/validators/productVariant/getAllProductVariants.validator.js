import { param } from 'express-validator';

const getAllProductVariantsValidator = [
  param('productId')
    .notEmpty()
    .withMessage('Prodcut id is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid product id.'),
];

export default getAllProductVariantsValidator;

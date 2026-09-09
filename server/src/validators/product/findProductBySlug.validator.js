import { param } from 'express-validator';

const findProductBySlugValidator = [
  param('slug')
    .trim()
    .notEmpty()
    .withMessage('Product slug is required.')
    .bail()
    .isSlug()
    .withMessage('Invalid Product Slug'),
];

export default findProductBySlugValidator;

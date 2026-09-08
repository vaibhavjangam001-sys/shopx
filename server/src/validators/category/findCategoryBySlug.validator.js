import { param } from 'express-validator';

const findCategoryBySlugValidator = [
  param('slug')
    .trim()
    .notEmpty()
    .withMessage('Category slug is required.')
    .bail()
    .isSlug()
    .withMessage('Invalid category slug.'),
];

export default findCategoryBySlugValidator;

import { body } from 'express-validator';

const createCategoryValidator = [
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category name is required.')
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage('Category name must be between 2 and 100 characters.'),

  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Category slug is required.')
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage('Category slug must be between 2 and 100 characters.')
    .bail()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must contain only lowercase letters, numbers, hyphens.'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Category description must be less than 500 characters.'),
];

export default createCategoryValidator;

import { body } from 'express-validator';
import { REGEX } from '../../constants/index.js';

const updateCategoryValidator = [
  body('category')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Category name must be between 2 and 100 characters.'),

  body('slug')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Category slug must be between 2 and 100 characters.')
    .bail()
    .matches(REGEX.SLUG)
    .withMessage(
      'Slug must contain only lowercase letters, numbers, and hyphens.'
    ),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Category description must be less than 500 characters.'),
];

export default updateCategoryValidator;

import { param } from 'express-validator';

const findCategoryByIdValidator = [
  param('categoryId')
    .notEmpty()
    .withMessage('Category id is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid category id.'),
];

export default findCategoryByIdValidator;

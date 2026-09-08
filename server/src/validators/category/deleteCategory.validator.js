import { param } from 'express-validator';

const deleteCategoryValidator = [
  param('categoryId')
    .notEmpty()
    .withMessage('Category id is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid category id.'),
];

export default deleteCategoryValidator;

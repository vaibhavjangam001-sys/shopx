import { body } from 'express-validator';
import mongoose from 'mongoose';

export const addCartItemValidator = [
  body('productVariantId')
    .trim()
    .notEmpty()
    .withMessage('Product variant ID is required.')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid product variant ID.'),

  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required.')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer.'),
];

export default addCartItemValidator;

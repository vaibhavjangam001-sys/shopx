import { body } from 'express-validator';

const createRefundValidator = [
  body('paymentId')
    .trim()
    .notEmpty()
    .withMessage('Payment ID is required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid payment ID.'),

  body('amount')
    .notEmpty()
    .withMessage('Refund amount is required.')
    .bail()
    .custom((value) => {
      if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
        throw new Error('Refund amount must be a positive number.');
      }

      return true;
    }),

  body('reason')
    .optional({ nullable: true })
    .isString()
    .withMessage('Refund reason must be a string.')
    .bail()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Refund reason cannot exceed 500 characters.'),
];

export default createRefundValidator;

import { query } from 'express-validator';

const paymentsQueryValidator = [
  query('status')
    .optional()
    .isIn(['CREATED', 'PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'])
    .withMessage('Invalid payment status.'),

  query('provider')
    .optional()
    .isIn(['RAZORPAY'])
    .withMessage('Invalid payment provider.'),

  query('keyword')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Keyword cannot be empty.')
    .bail()
    .isLength({ max: 100 })
    .withMessage('Keyword cannot exceed 100 characters.'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer.'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be an integer between 1 and 100.'),

  query('sort')
    .optional()
    .isString()
    .withMessage('Sort must be a string.')
    .bail()
    .custom((value) => {
      const allowedFields = [
        'createdAt',
        'updatedAt',
        'amount',
        'status',
        'paidAt',
      ];

      const sortFields = value.split(',');

      const areValid = sortFields.every((field) => {
        const fieldName = field.startsWith('-') ? field.slice(1) : field;

        return allowedFields.includes(fieldName);
      });

      if (!areValid) {
        throw new Error('Sort contains an invalid field.');
      }

      return true;
    }),

  query('fields')
    .optional()
    .isString()
    .withMessage('Fields must be a string.')
    .bail()
    .custom((value) => {
      const allowedFields = [
        'order',
        'user',
        'provider',
        'providerOrderId',
        'providerPaymentId',
        'amount',
        'currency',
        'status',
        'failureReason',
        'paidAt',
        'refundedAt',
        'createdAt',
        'updatedAt',
      ];

      const fields = value.split(',');

      if (!fields.every((field) => allowedFields.includes(field))) {
        throw new Error('Fields contain an invalid field.');
      }

      return true;
    }),
];

export default paymentsQueryValidator;

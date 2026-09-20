import { body, param } from 'express-validator';
import { REGEX } from '../../constants/index.js';

const updateAddressValidator = [
  param('addressId')
    .trim()
    .notEmpty()
    .withMessage('Address ID required.')
    .bail()
    .isMongoId()
    .withMessage('Invalid Address Id.'),

  body('fullName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Full name cannot be empty.')
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters.'),

  body('phone')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Phone number cannot be empty.')
    .bail()
    .matches(REGEX.PHONE_REGEX)
    .withMessage('Please provide a valid Indian phone number.'),

  body('alternativePhone')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Alternative phone number cannot be empty.')
    .bail()
    .matches(REGEX.PHONE_REGEX)
    .withMessage('Please provide a valid alternative phone number.'),

  body('addressLine1')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Address line 1 cannot be empty.')
    .bail()
    .isLength({ min: 12, max: 200 })
    .withMessage('Address line 1 must be between 12 and 200 characters.'),

  body('addressLine2')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Address line 2 cannot be empty.')
    .bail()
    .isLength({ max: 200 })
    .withMessage('Address line 2 cannot be exceed 200 characters.'),

  body('city')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('City name cannot be empty.')
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage('City name must be between 2 and 50 characters.'),

  body('state')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('State name cannot be empty.')
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage('State name must be between 2 and 50 characters.'),

  body('postalCode')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Postal Code cannot be empty.')
    .bail()
    .matches(REGEX.POSTAL_CODE)
    .withMessage('Postal code must be a valid 6-digit PIN code.'),

  body('country')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Country name cannot be empty.')
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage('Country name must be between 2 and 50 characters.'),

  body('addressType')
    .optional()
    .isIn(['HOME', 'WORK', 'OTHER'])
    .withMessage('Address type must be HOME, WORK, or OTHER.'),

  body('isDefault')
    .optional()
    .isBoolean()
    .withMessage('isDefault must be a boolean.'),
];

export default updateAddressValidator;

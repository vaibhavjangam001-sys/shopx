import { validationResult } from 'express-validator';
import { ApiError } from '../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../constants/index.js';

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.VALIDATION.FAILED,
      errors.array()
    );
  }

  next();
};

export default validationMiddleware;

import { HTTP_STATUS, MESSAGES } from '../constants/index.js';

class ApiError extends Error {
  constructor(
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message = MESSAGES.SERVER.INTERNAL_ERROR,
    errors = [],
    stack = ''
  ) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;

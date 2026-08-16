import { ApiError } from '../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../constants/index.js';
import multer from 'multer';

const errorMiddleware = (err, req, res, next) => {
  let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = MESSAGES.SERVER.INTERNAL_ERROR;
  let errors = [];

  if (err instanceof multer.MulterError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;

    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'Image size must not exceed 5 MB';
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      message = 'Maximum 5 images are allowed';
    } else {
      message = 'File upload failed';
    }

    return res.status(statusCode).json({
      statusCode,
      success: false,
      message,
      errors,
    });
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err.name === 'ValidationError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = MESSAGES.VALIDATION.FAILED;

    errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
  } else if (err.name === 'CastError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = `Invalid ${err.path}`;
  } else if (err.code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    message = MESSAGES.DATABASE.DUPLICATE_VALUE;

    const field = Object.keys(err.keyValue || {})[0];

    if (field) {
      errors = [
        {
          field,
          message: `${field} already exists`,
        },
      ];
    }
  }

  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errors,
  });
};

export default errorMiddleware;

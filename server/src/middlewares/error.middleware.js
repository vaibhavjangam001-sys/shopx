import ApiError from '../utils/ApiError.util.js';

const errorMiddleware = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal server error.';
  let errors = [];

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';

    errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}`;
  } else if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate value already exists';

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

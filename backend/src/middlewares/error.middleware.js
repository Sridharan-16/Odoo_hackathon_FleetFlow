const errorMiddleware = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal server error';

  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = error.message;
  } else if (error.message === 'Invalid credentials') {
    statusCode = 401;
    message = 'Invalid email or password';
  } else if (error.message === 'Account is inactive') {
    statusCode = 403;
    message = 'Account is inactive';
  } else if (error.message === 'Email already exists') {
    statusCode = 409;
    message = 'Email already registered';
  } else if (error.code === 'ER_DUP_ENTRY') {
    statusCode = 409;
    message = 'Duplicate entry';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

export default errorMiddleware;
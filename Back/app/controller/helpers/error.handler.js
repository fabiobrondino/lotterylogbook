const ApiError = require('../../errors/ApiError');
const logger = require('../../utils/logger');


const errorHandler = (error, _, response, next) => {

  logger.log('error', error.message);
  if (error instanceof ApiError) {
    if (process.env.NODE_ENV === 'development') {
      return response.status(error.status).json({ status: 'error', message: error.message, stack: error.stack });
    }
    return response.status(error.status).json({ status: 'error', message: error.message });
  }
  if (process.env.NODE_ENV === 'development') {
    return response.status(500).json({ status: 'error', message: error.message, stack: error.stack });
  }
  return response.status(500).json({ status: 'error', message: 'Internal server error' });
};

module.exports = errorHandler;
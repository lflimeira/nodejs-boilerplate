const { logger } = require('../../lib/logger')

const errorHandler = (error, req, res, next) => {
  logger.error(error.stack, { id: req.id })

  if (error.type === 'validation') {
    res.locals.payload = {
      type: 'error',
      statusCode: error.statusCode,
      data: error.fields.map(field => ({
        type: error.type,
        message: field.message || error.message,
        parameter_name: (field.path !== undefined ? field.path : field),
      })),
    }
  } else {
    res.locals.payload = {
      type: 'error',
      statusCode: error.statusCode || 500,
      data: [
        {
          message: error.message || 'Internal server error',
          type: error.type || 'internal_server_error',
          code: error.code,
        },
      ],
    }
  }

  return next('route')
}

module.exports = errorHandler

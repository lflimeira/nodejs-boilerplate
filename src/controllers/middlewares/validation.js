const Joi = require('joi')
const {
  pick,
  mergeAll,
} = require('ramda')

const { logger } = require('../../lib/logger')
const { ValidationError } = require('../../helpers/errors')
const schemas = require('../schemas')

const formatError = pick(['message', 'path'])

const validationFactory = schema => (req, res, next) => {
  const { error } = Joi.validate(req, schema, {
    allowUnknown: true,
    presence: 'required',
  })

  if (error) {
    const fieldsWithError = error.details.map(formatError)
    logger.error(error.message, {
      stack: error.stack,
    })
    return next(new ValidationError('Invalid payload', fieldsWithError))
  }

  return next()
}

const validationMiddlewares = Object.keys(schemas).map(schema => ({
  [schema]: validationFactory(schemas[schema]),
}))

module.exports = mergeAll(validationMiddlewares)

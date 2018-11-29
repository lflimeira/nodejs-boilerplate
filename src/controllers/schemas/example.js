const Joi = require('joi')

const example = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
  }),
}

module.exports = {
  example,
}

const { logger } = require('../lib/logger')
const { ExampleError } = require('../helpers/errors')
const database = require('../database')

const example = async (req, res, next) => {
  const { name, email } = req.body

  try {
    const exampleCreate = await database.Example.create({
      name,
      email,
    })

    res.locals.payload = {
      type: 'response',
      data: {
        name: exampleCreate.name,
        email: exampleCreate.email,
        message: 'Success example message',
        status: 'example_success',
      },
    }

    logger.info(`Success example ${exampleCreate}`)
    return next()
  } catch (error) {
    logger.error(error.message)
    return next(new ExampleError('Example error'))
  }
}

module.exports = {
  example,
}

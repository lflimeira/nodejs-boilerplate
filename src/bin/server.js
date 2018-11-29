require('dotenv').config({ path: process.env.DOTENV_PATH })
const express = require('express')
const bodyParser = require('body-parser')

const database = require('../database')
const errorHandler = require('../controllers/middlewares/error')
const redirectHTTP = require('../controllers/middlewares/redirect-http')
const responseHandler = require('../controllers/middlewares/response')
const routeNotFoundHandler = require('../controllers/middlewares/notfound')
const { httpLogger, logger } = require('../lib/logger')
const exampleRouter = require('../routes/example')

const app = express()

const allRoutesExceptHealthCheck = /^\/(?!_health_check(\/|$)).*$/i

app.use(bodyParser.json())
app.use(httpLogger)
app.use(allRoutesExceptHealthCheck, redirectHTTP)

app.disable('x-powered-by')

app.get(
  '/_health_check',
  (req, res) => res.send()
)

app.use(
  '/example',
  exampleRouter
)

app.use(routeNotFoundHandler)
app.use(errorHandler)
app.use(responseHandler)

const bootstrap = async () => {
  try {
    await database.bootstrap()
    await app.listen(process.env.PORT)

    logger.info('Server up and running', {
      port: process.env.PORT,
      nodeEnv: process.env.NODE_ENV,
    })
  } catch (err) {
    logger.error('Error bootstraping application', {
      stack: err.stack,
    })
  }
}

if (process.env.NODE_ENV !== 'test') {
  bootstrap()
}

module.exports = app

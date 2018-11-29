require('dotenv').config({ path: process.env.DOTENV_PATH })

const { logger } = require('../lib/logger')

const host = process.env.DATABASE_URL
const database = process.env.DATABASE_NAME
const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD
const port = process.env.DATABASE_PORT
const logging = process.env.DATABASE_LOGGING === 'true' ? logger.warn : false

const dialect = 'postgres'

const config = {
  host,
  dialect,
  database,
  username,
  password,
  port,
  logging,
}

module.exports = config

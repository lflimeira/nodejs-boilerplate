const fs = require('fs')
const path = require('path')
const databaseConfig = require('../config/database')
const Sequelize = require('sequelize')
const { logger } = require('../lib/logger')

const db = {
  Sequelize,
}

const {
  host,
  dialect,
  database,
  username,
  password,
  port,
  logging,
} = databaseConfig

const sequelize = new Sequelize(
  database,
  username,
  password,
  {
    host,
    port,
    dialect,
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    logging,
  }
)
db.sequelize = sequelize

const readModelFiles = async () => {
  try {
    const files = fs.readdirSync(path.join(__dirname, 'models'))
    const validFiles = files
      .filter(file => (file !== 'index.js') && (file.slice(-3) === '.js'))

    validFiles
      .map((file) => {
        const model = sequelize.import(path.join(__dirname, 'models/', file))

        db[model.name] = model

        return model
      })
      .map(async (model) => {
        if (model.associate) {
          await model.associate(model, db)
        }
      })
  } catch (err) {
    logger.error('Error reading model files')
    throw err
  }
}

const bootstrap = async () => {
  try {
    logger.info('Starting database bootstrap')
    await readModelFiles()

    logger.info('Attempting database authentication')
    await db.sequelize.authenticate()

    logger.info('Authentication successful')
  } catch (err) {
    logger.error('Error bootstraping application')
    throw err
  }
}

db.bootstrap = bootstrap

module.exports = db

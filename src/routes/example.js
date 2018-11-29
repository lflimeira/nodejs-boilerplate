const express = require('express')
const validateSchema = require('../controllers/middlewares/validation')
const exampleController = require('../controllers/example')

const router = express.Router()

router.post(
  '/',
  validateSchema.example,
  exampleController.example
)

module.exports = router

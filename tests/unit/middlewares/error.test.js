const errorHandler = require('../../../src/controllers/middlewares/error')

describe('Error Handler', () => {
  describe('with generic error', () => {
    const error = {
      code: '007',
      stack: 'StackTrace',
    }

    const req = { id: 'request_id' }
    const res = {
      locals: {},
    }
    const next = () => {}

    errorHandler(error, req, res, next)

    test('should include standard error payload on `res.locals`', () => {
      expect(res.locals.payload).toMatchObject({
        type: 'error',
        statusCode: 500,
        data: [{
          message: 'Internal server error',
          type: 'internal_server_error',
          code: '007',
        }],
      })
    })
  })

  describe('with custom made error', () => {
    const error = {
      type: 'fake_error',
      statusCode: 418,
      message: 'I\'m a teapot',
      code: '007',
      stack: 'StackTrace',
    }

    const req = { id: 'request_id' }
    const res = {
      locals: {},
    }
    const next = () => {}

    errorHandler(error, req, res, next)

    test('should include standard error payload on `res.locals`', () => {
      expect(res.locals.payload).toMatchObject({
        type: 'error',
        statusCode: 418,
        data: [{
          message: 'I\'m a teapot',
          type: 'fake_error',
          code: '007',
        }],
      })
    })
  })

  describe('with validation error', () => {
    const error = {
      type: 'validation',
      statusCode: 400,
      fields: [{
        message: 'This field is invalid',
        path: 'fake_field',
      }],
      stack: 'StackTrace',
    }

    const req = { id: 'request_id' }
    const res = {
      locals: {},
    }
    const next = () => {}

    errorHandler(error, req, res, next)

    test('should include standard error payload on `res.locals`', () => {
      expect(res.locals.payload).toMatchObject({
        type: 'error',
        statusCode: 400,
        data: [{
          message: 'This field is invalid',
          type: 'validation',
          parameter_name: 'fake_field',
        }],
      })
    })
  })
})

const notFoundHandler = require('../../../src/controllers/middlewares/notfound')
const { RouteNotFoundError } = require('../../../src/helpers/errors')

describe('Not Found Handler', () => {
  const req = {
    method: 'POST',
    originalUrl: '/random/url',
  }

  const next = input => input

  describe('if there is no `res.locals.payload`', () => {
    const res = {
      locals: {},
    }

    const result = notFoundHandler(req, res, next)

    test('should trigger RouteNotFoundError', () => {
      expect(result instanceof RouteNotFoundError).toBe(true)
    })
  })

  describe('if there is `res.locals.payload`', () => {
    const res = {
      locals: {
        payload: {},
      },
    }

    const result = notFoundHandler(req, res, next)

    test('should call `next` with normal flow', () => {
      expect(result).toBe('route')
    })
  })
})

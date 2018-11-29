const redirectHttp = require('../../../src/controllers/middlewares/redirect-http')

describe('Redirect HTTP', () => {
  const req = {
    headers: {},
    header: h => req.headers[h],
    method: 'POST',
    hostname: 'baseurl',
    originalUrl: '/random/route',
  }
  const res = {
    redirect: (redirStatusCode, pathUrl) => ({ redirStatusCode, pathUrl }),
  }
  const next = () => false

  describe('with no `X-Forwarded-Proto` header', () => {
    describe('on `test`', () => {
      const result = redirectHttp(req, res, next)

      test('should not redirect request', () => {
        expect(result).toBe(false)
      })
    })

    describe('on `production`', () => {
      describe('POSTing', () => {
        let result

        beforeAll(() => {
          const nodeEnv = process.env.NODE_ENV
          process.env.NODE_ENV = 'production'
          result = redirectHttp(req, res, next)
          process.env.node_ENV = nodeEnv
        })

        test('should redirect request', () => {
          expect(result).toMatchObject({
            redirStatusCode: 307,
            pathUrl: 'https://baseurl/random/route',
          })
        })
      })

      describe('GETing', () => {
        let result

        beforeAll(() => {
          const nodeEnv = process.env.NODE_ENV
          process.env.NODE_ENV = 'production'
          const { method } = req
          req.method = 'GET'
          result = redirectHttp(req, res, next)
          req.method = method
          process.env.node_ENV = nodeEnv
        })

        test('should redirect request', () => {
          expect(result).toMatchObject({
            redirStatusCode: 302,
            pathUrl: 'https://baseurl/random/route',
          })
        })
      })
    })
  })

  describe('with `X-Forwarded-Proto` header set to `https`', () => {
    beforeAll(() => {
      req.headers['X-Forwarded-Proto'] = 'https'
    })

    describe('on `test`', () => {
      const result = redirectHttp(req, res, next)

      test('should not redirect request', () => {
        expect(result).toBe(false)
      })
    })

    describe('on `production`', () => {
      let result

      beforeAll(() => {
        const nodeEnv = process.env.NODE_ENV
        process.env.NODE_ENV = 'production'
        result = redirectHttp(req, res, next)
        process.env.node_ENV = nodeEnv
      })

      test('should not redirect request', () => {
        expect(result).toBe(false)
      })
    })
  })
})

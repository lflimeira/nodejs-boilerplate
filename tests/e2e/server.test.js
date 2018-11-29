const request = require('supertest')

const app = require('../../src/bin/server')

describe('Server', () => {
  describe('Faking production environment', () => {
    let nodeEnv = process.env.NODE_ENV

    beforeAll(() => {
      nodeEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'
    })

    afterAll(() => {
      process.env.NODE_ENV = nodeEnv
    })

    test('POST http should redirect to https', () =>
      request(app)
        .post('/random/route')
        .then((response) => {
          expect(response.statusCode).toBe(307)
        }))
  })

  describe('Basic middleware functionalities', () => {
    test('GET `/_health_check` should respond with status code `200`', () =>
      request(app)
        .get('/_health_check')
        .then(response => expect(response.statusCode).toBe(200)))

    test('GET `/_health_check` should not contain `x-powered-by` header', () =>
      request(app)
        .get('/_health_check')
        .then(response => expect(response.headers).not.toHaveProperty('x-powered-by')))

    test('POST `/random/route` should respond with not found error', () =>
      request(app)
        .post('/random/route')
        .then((response) => {
          expect(response.statusCode).toBe(404)
          expect(response.body).toMatchObject({
            errors: [{
              message: 'Can\'t POST on route /random/route',
              type: 'not_found',
            }],
          })
        }))
  })
})

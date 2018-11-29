const database = require('../../../src/database')

const {
  bootstrap,
} = database

describe('Database', () => {
  describe('bootstrap', () => {
    describe('with valid data', () => {
      let success = true

      beforeAll(async () => {
        try {
          await bootstrap()
        } catch (err) {
          success = false
        }
      })

      afterAll(async () => {
        await database.sequelize.close()
      })

      test('should succeed', () => {
        expect(success).toBe(true)
      })
    })
  })
})

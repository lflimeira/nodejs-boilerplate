const { RouteNotFoundError } = require('../../helpers/errors')

const routeNotFoundHandler = (req, res, next) => {
  if (!res.locals.payload) {
    const errorMessage = `Can't ${req.method} on route ${req.originalUrl}`

    return next(new RouteNotFoundError(errorMessage))
  }

  return next('route')
}

module.exports = routeNotFoundHandler

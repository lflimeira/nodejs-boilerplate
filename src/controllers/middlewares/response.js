const responseHandler = (req, res) => {
  const { payload } = res.locals

  if (payload.type === 'error') {
    return res.status(payload.statusCode).send({
      errors: payload.data,
    })
  }

  return res.status(200).send({
    data: payload.data,
  })
}

module.exports = responseHandler

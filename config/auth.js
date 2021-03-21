const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
  const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']

  const err = {
    code: 401,
    error: true,
    message: 'Token inválido'
  }

  if (!token) {
    res.status(403).send(err)
    return false
  }

  try {
    req.decoded = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    res.status(403).send(err)
    return false
  }
}
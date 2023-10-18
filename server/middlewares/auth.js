require('dotenv')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const { NODE_ENV, JWT_SECRET } = require('../envconfig')

module.exports = (req, res, next) => {
  let payload
  try {
    const token = req.params.jwt
    // пытаемся верифицировать токен
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    )
  } catch (err) {
    return next(createError(401, 'Необходима авторизация'))
  }
  req.user = payload
  next()
}

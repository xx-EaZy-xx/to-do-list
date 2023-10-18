require('dotenv')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const { NODE_ENV, JWT_SECRET } = require('../envconfig')

module.exports = (req, res, next) => {
  let payload
  try {
    const token = req.headers.authorization.slice(7)
    //верифицируем токен
    payload = jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return next(createError(401, 'Необходима авторизация'))
  }
  req.user = payload
  next()
}

require('dotenv')
const jwt = require('jsonwebtoken')

const { JWT_SECRET, NODE_ENV } = process.env

module.exports = (req, res, next) => {
  let payload
  try {
    const token = req.cookies.jwt
    // попытаемся верифицировать токен
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    )
  } catch (err) {
    return next(new Error('Необходима авторизация'))
  }
  req.user = payload
  next()
}

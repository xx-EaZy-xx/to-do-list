const { User } = require('../models')
const createError = require('http-errors')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const login = async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: { email: req.body.email, password: req.body.password },
    })
    const matched = await bcrypt.compare(password, user.password)
    if (!matched) {
      return next(createError(401, 'Неправильный пароль'))
    }

    const token = jsonwebtoken.sign(
      { id: user.id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' }
    )
    return res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
      .send({ message: 'Токен сохранен в httpOnly кукис' })
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

module.exports = { login }

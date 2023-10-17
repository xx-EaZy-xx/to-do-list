const { User } = require('../models')
const bcrypt = require('bcryptjs')
const createError = require('http-errors')

const register = async (req, res, next) => {
  try {
    const { login, email, password, secondPassword } = req.body
    if (password === secondPassword) {
      const hash = await bcrypt.hash(password, 10)
      const user = await User.create({
        login,
        email,
        password: hash,
      })
      return res.status(201).json({
        login: user.login,
        email: user.email,
        id: user.id,
      })
    } else {
      throw createError(400, 'Пароли не совпадают')
    }
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

module.exports = { register }

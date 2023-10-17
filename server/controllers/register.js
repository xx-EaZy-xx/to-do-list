const { User } = require('../models')
const bcrypt = require('bcryptjs')

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      password: hash,
    })
    return res.status(201).json({
      name: user.name,
      email: user.email,
      id: user.id,
    })
  } catch (err) {
    if (err.code === 11000) {
      return next(
        new EmailExistsError('Пользователь с таким email уже существует')
      )
    }
    console.error(err)
    return next(err)
  }
}

module.exports = { register }

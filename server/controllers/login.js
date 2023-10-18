const { User } = require('../models')
const createError = require('http-errors')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const { JWT_SECRET } = require('../envconfig')

const login = async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: { login: req.body.login },
    })
    const userId = user[0].userId
    const userName = user[0].login
    const matched = await bcrypt.compare(req.body.password, user[0].password)
    if (!matched) {
      return next(createError(401, 'Неправильный пароль'))
    }
    //здесь что-то не так
    const token = jsonwebtoken.sign({ id: user[0].id }, JWT_SECRET, {
      expiresIn: '7d',
    })
    return res.status(200).send({ token, userId, userName })
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

module.exports = { login }

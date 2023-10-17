const { User } = require('../models')
const createError = require('http-errors')

const getUser = async (req, res, next) => {
  try {
    const user = await User.findAll({ where: { id: req.query.id } })
    res.status(200).send(user)
  } catch (err) {
    console.log(err)
    return next(createError(404, 'Данный пользователь не найден'))
  }
}

module.exports = { getUser }

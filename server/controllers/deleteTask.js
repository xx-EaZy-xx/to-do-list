const { Task } = require('../models')
const createError = require('http-errors')

const deleteTask = async (req, res, next) => {
  try {
    await Task.destroy({ where: { id: req.body.id } })
    return res.status(200).send(`task ${req.body.id} is deleted`)
  } catch (err) {
    console.log(err)
    return next(createError(400, 'Передан некорректный ID задачи'))
  }
}

module.exports = { deleteTask }

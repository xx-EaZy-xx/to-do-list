const { Task } = require('../models')
const createError = require('http-errors')

const postTask = async (req, res, next) => {
  try {
    const createdTask = await Task.create({
      name: req.body.name,
      date: req.body.date,
      partialDate: req.body.partialDate,
    })
    return res.json(createdTask)
  } catch (err) {
    console.log(error)
    return next(
      createError(400, 'Переданы некорректные данные при создании задачи')
    )
  }
}

module.exports = { postTask }

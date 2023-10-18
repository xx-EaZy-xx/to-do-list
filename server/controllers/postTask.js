const { Task, User } = require('../models')
const createError = require('http-errors')

const postTask = async (req, res, next) => {
  try {
    const createdTask = await Task.create({
      name: req.body.name,
      date: req.body.date,
      partialDate: req.body.partialDate,
      creatorId: req.body.userId,
    })
    return res.json(createdTask)
  } catch (err) {
    console.log(err)
    return next(
      createError(
        409,
        'Переданы некорректные данные при создании задачи - имя задачи не должно повторяться'
      )
    )
  }
}

module.exports = { postTask }

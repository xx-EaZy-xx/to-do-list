const { Task } = require('../models')
const createError = require('http-errors')

const patchTask = async (req, res, next) => {
  try {
    if (req.body.name) {
      await Task.update(
        {
          name: req.body.name,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      )
      return res.status(200).send(`task ${req.body.name} was updated`)
    } else {
      const taskById = await Task.findOne({
        where: {
          id: req.body.id,
        },
      })
      await taskById.update(
        {
          isDone: !taskById.isDone,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      )
      return res.status(200).send(`task ${req.body.id} was updated`)
    }
  } catch (err) {
    console.log(err)
    return next(createError(400, 'Передан некорректный идентификатор задачи'))
  }
}
module.exports = { patchTask }

const { Task } = require('../models')
const createError = require('http-errors')

const patchTask = async (req, res, next) => {
  try {
    const taskById = await Task.findOne({
      where: {
        id: req.body.id,
      },
    })
    await Task.update(
      req.body.name
        ? {
            name: req.body.name,
          }
        : { isDone: !taskById.isDone },
      {
        where: {
          id: req.body.id,
        },
      }
    )
    return res.status(200).send(`task ${req.body.name} was updated`)
  } catch (err) {
    console.log(err)
    return next(createError(400, 'Передан некорректный идентификатор задачи'))
  }
}
module.exports = { patchTask }

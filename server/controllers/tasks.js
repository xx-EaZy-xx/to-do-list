const { Task } = require('../models')

const getTasks = (req, res, next) => {
  Task.findAll()
    .then((task) => {
      res.send(task)
    })
    .catch((err) => {
      next(err)
    })
}

const createTasks = async (req, res, next) => {
  console.log(req.body.name)
  Task.create({ name: req.body.name, date: '12.12.2012' })
    .then((task) => {
      res.send(task)
    })
    .catch((err) => {
      next(err)
    })
}

const deleteTasks = async (req, res, next) => {
  Task.destroy({ where: { id: req.body.id } })
    .then((task) => {
      res.send(`task ${req.body.id} is deleted`)
    })
    .catch((err) => next(err))
}

const patchTasks = async (req, res, next) => {
  if (req.body.name) {
    TaskModel.update(
      {
        name: req.body.name,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then((task) => {
        res.status(200).send(`task ${req.body.name} was updated`)
      })
      .catch((err) => next(err))
  } else {
    TaskModel.findOne({
      where: {
        id: req.body.id,
      },
    })
      .then((task) => {
        task.update(
          {
            isDone: !task.isDone,
          },
          {
            where: {
              id: req.body.id,
            },
          }
        )
      })
      .catch((err) => next(err))
  }
}

module.exports = {
  getTasks,
  createTasks,
  patchTasks,
  deleteTasks,
}

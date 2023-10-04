const { Task } = require('../models')

const getTasks = (req, res, next) => {
  const pageSize = 7
  const offset = (req.query.page - 1) * pageSize
  const limit = pageSize
  //Unified function
  function getThemAll(arg) {
    Task.findAll(arg)
      .then((task) => {
        res.send(task)
      })
      .catch((err) => {
        next(err)
      })
  }

  if (req.query.filter === 'Today') {
    getThemAll({
      where: { date: new Date().toLocaleString().slice(0, 10) },
      order: [['id']],
      offset,
      limit,
    })
  }
  if (req.query.filter === 'All') {
    getThemAll({ offset, limit })
  }
  if (req.query.filter === 'Done') {
    getThemAll({ where: { isDone: true }, offset, limit })
  }
  if (req.query.filter === 'Undone') {
    getThemAll({ where: { isDone: false }, offset, limit })
  }
  if (req.query.filter === 'ASC') {
    getThemAll({ order: [['createdAt'], ['id']], offset, limit })
  }
  if (req.query.filter === 'DESC') {
    getThemAll({
      order: [
        ['createdAt', 'DESC'],
        ['id', 'DESC'],
      ],
      offset,
      limit,
    })
  }
}

const createTasks = async (req, res, next) => {
  Task.create({ name: req.body.name, date: req.body.date })
    .then((task) => {
      res.send(task)
    })
    .catch((err) => {
      next(err)
    })
}

const deleteTasks = async (req, res, next) => {
  Task.destroy({ where: { id: req.body.id } })
    .then(() => {
      res.send(`task ${req.body.id} is deleted`)
    })
    .catch((err) => next(err))
}

const patchTasks = async (req, res, next) => {
  if (req.body.name) {
    Task.update(
      {
        name: req.body.name,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then(() => {
        res.status(200).send(`task ${req.body.name} was updated`)
      })
      .catch((err) => next(err))
  } else {
    Task.findOne({
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
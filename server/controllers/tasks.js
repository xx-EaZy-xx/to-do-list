const { Task } = require('../models')

const getTasks = (req, res, next) => {
  const pageSize = 7
  const offset = (req.query.page - 1) * pageSize
  const limit = pageSize

  //Unified function
  function getThemAll(arg) {
    Task.findAll(arg)
      .then((tasks) => {
        Task.findAll({ where: arg.where }).then((total) => {
          res.send({ tasks, total })
        })
      })
      .catch((err) => {
        next(err)
      })
  }
  //All ASC
  if (
    req.query.filter === 'All' &&
    req.query.sortVector === 'ASC' &&
    req.query.today === 'any'
  ) {
    getThemAll({ order: [['createdAt', 'ASC']], offset, limit })
  }
  if (
    req.query.filter === 'All' &&
    req.query.sortVector === 'ASC' &&
    req.query.today === 'today'
  ) {
    getThemAll({
      where: { partialDate: new Date().toLocaleString().slice(0, 10) },
      order: [['createdAt', 'ASC']],
      offset,
      limit,
    })
  }
  //All DESC
  if (
    req.query.filter === 'All' &&
    req.query.sortVector === 'DESC' &&
    req.query.today === 'any'
  ) {
    getThemAll({ order: [['createdAt', 'DESC']], offset, limit })
  }
  if (
    req.query.filter === 'All' &&
    req.query.sortVector === 'DESC' &&
    req.query.today === 'today'
  ) {
    getThemAll({
      where: { partialDate: new Date().toLocaleString().slice(0, 10) },
      order: [['createdAt', 'DESC']],
      offset,
      limit,
    })
  }
  //Done ASC
  if (
    req.query.filter === 'Done' &&
    req.query.sortVector === 'ASC' &&
    req.query.today === 'any'
  ) {
    getThemAll({
      order: [['createdAt', 'ASC']],
      where: { isDone: true },
      offset,
      limit,
    })
  }
  if (
    req.query.filter === 'Done' &&
    req.query.sortVector === 'ASC' &&
    req.query.today === 'today'
  ) {
    getThemAll({
      order: [['createdAt', 'ASC']],
      where: {
        isDone: true,
        partialDate: new Date().toLocaleString().slice(0, 10),
      },
      offset,
      limit,
    })
  }
  //Done DESC
  if (
    req.query.filter === 'Done' &&
    req.query.sortVector === 'DESC' &&
    req.query.today === 'any'
  ) {
    getThemAll({
      order: [['createdAt', 'DESC']],
      where: { isDone: true },
      offset,
      limit,
    })
  }
  if (
    req.query.filter === 'Done' &&
    req.query.sortVector === 'DESC' &&
    req.query.today === 'today'
  ) {
    getThemAll({
      order: [['createdAt', 'DESC']],
      where: {
        isDone: true,
        partialDate: new Date().toLocaleString().slice(0, 10),
      },
      offset,
      limit,
    })
  }
  //Undone ASC
  if (
    req.query.filter === 'Undone' &&
    req.query.sortVector === 'ASC' &&
    req.query.today === 'any'
  ) {
    getThemAll({
      order: [['createdAt', 'ASC']],
      where: { isDone: false },
      offset,
      limit,
    })
  }
  if (
    req.query.filter === 'Undone' &&
    req.query.sortVector === 'ASC' &&
    req.query.today === 'today'
  ) {
    getThemAll({
      order: [['createdAt', 'ASC']],
      where: {
        isDone: false,
        partialDate: new Date().toLocaleString().slice(0, 10),
      },
      offset,
      limit,
    })
  }
  //Undone DESC
  if (
    req.query.filter === 'Undone' &&
    req.query.sortVector === 'DESC' &&
    req.query.today === 'any'
  ) {
    getThemAll({
      order: [['createdAt', 'DESC']],
      where: { isDone: false },
      offset,
      limit,
    })
  }
  if (
    req.query.filter === 'Undone' &&
    req.query.sortVector === 'DESC' &&
    req.query.today === 'today'
  ) {
    getThemAll({
      order: [['createdAt', 'DESC']],
      where: {
        isDone: false,
        partialDate: new Date().toLocaleString().slice(0, 10),
      },
      offset,
      limit,
    })
  }
}

const createTasks = async (req, res, next) => {
  Task.create({
    name: req.body.name,
    date: req.body.date,
    partialDate: req.body.partialDate,
  })
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
      .then(() => {
        res.status(200).send(`task ${req.body.id} was updated`)
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

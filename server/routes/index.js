const index = require('express').Router()
const NotFoundError = require('../errors/NotFoundError')
const centralCatcher = require('../middlewares/centralCatcher')
const { errorLogger, requestLogger } = require('../middlewares/logger')
const tasks = require('./tasks')

index.use(requestLogger)

index.use('/tasks', tasks)
index.use('/tasks/q', (req, res) => {
  res.send(req.query.key)
})

index.use('*', (req, res, next) => {
  const err = new NotFoundError('Страница не существует')
  next(err)
})

index.use(errorLogger)

index.use(centralCatcher)

module.exports = index

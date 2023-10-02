const { NODE_ENV, JWT_SECRET } = process.env

const getTasks = (req, res, next) => {
  res.send('get tasks')
}

const createTasks = (req, res, next) => {
  res.send('create tasks')
}

const patchTasks = (req, res, next) => {
  res.send('patch tasks')
}

const deleteTasks = (req, res, next) => {
  res.send('delete tasks')
}

module.exports = {
  getTasks,
  createTasks,
  patchTasks,
  deleteTasks,
}

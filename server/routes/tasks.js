const tasks = require('express').Router()
const {
  getTasks,
  createTasks,
  patchTasks,
  deleteTasks,
} = require('../controllers/tasks')

tasks.get('/', getTasks)

tasks.post('/', createTasks)

tasks.patch('/', patchTasks)

tasks.delete('/', deleteTasks)

module.exports = tasks

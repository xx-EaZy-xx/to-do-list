const tasks = require('express').Router()
const {
  getTasks,
  createTasks,
  patchTasks,
  deleteTasks,
} = require('../controllers/tasks')

tasks.get('/', getTasks)

tasks.post('/', createTasks)

tasks.patch('/:_id', patchTasks)

tasks.delete('/:_id', deleteTasks)

module.exports = tasks

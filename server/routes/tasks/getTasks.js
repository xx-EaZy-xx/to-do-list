const router = require('express').Router()
const { getAllTasks } = require('../../controllers/getTasks')

router.get('/tasks/get', getAllTasks)

module.exports = router

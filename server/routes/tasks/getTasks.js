const router = require('express').Router()
const { getAllTasks } = require('../../controllers/getTasks')
const authMiddleware = require('../../middlewares/auth')

router.use(authMiddleware)
router.get('/tasks/get', getAllTasks)

module.exports = router

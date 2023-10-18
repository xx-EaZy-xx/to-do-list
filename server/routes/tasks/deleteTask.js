const router = require('express').Router()
const { deleteTaskValidation } = require('../../validation/validation')
const { deleteTask } = require('../../controllers/deleteTask')
const authMiddleware = require('../../middlewares/auth')

router.use(authMiddleware)
router.delete('/tasks/delete', deleteTaskValidation, deleteTask)

module.exports = router

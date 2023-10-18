const router = require('express').Router()
const { deleteTaskValidation } = require('../../validation/validation')
const { deleteTask } = require('../../controllers/deleteTask')

router.delete('/tasks/delete', deleteTaskValidation, deleteTask)

module.exports = router

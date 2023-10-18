const router = require('express').Router()
const { postTaskValidation } = require('../../validation/validation')
const { postTask } = require('../../controllers/postTask')

router.post('/tasks/post', postTaskValidation, postTask)

module.exports = router

const router = require('express').Router()
const { postTaskValidation } = require('../../validation/validation')
const { postTask } = require('../../controllers/postTask')
const authMiddleware = require('../../middlewares/auth')

router.use(authMiddleware)
router.post('/tasks/post', postTaskValidation, postTask)

module.exports = router

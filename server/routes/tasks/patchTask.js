const router = require('express').Router()
const { patchTaskValidation } = require('../../validation/validation')
const { patchTask } = require('../../controllers/patchTask')
const authMiddleware = require('../../middlewares/auth')

router.use(authMiddleware)
router.patch('/tasks/patch', patchTaskValidation, patchTask)

module.exports = router

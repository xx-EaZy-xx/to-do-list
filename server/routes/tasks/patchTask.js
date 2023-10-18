const router = require('express').Router()
const { patchTaskValidation } = require('../../validation/validation')
const { patchTask } = require('../../controllers/patchTask')

router.patch('/tasks/patch', patchTaskValidation, patchTask)

module.exports = router

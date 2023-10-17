const router = require('express').Router()
const { signInValidation } = require('../../validation/validation')
const { login } = require('../../controllers/login')

router.post('/users/login', signInValidation, login)

module.exports = router

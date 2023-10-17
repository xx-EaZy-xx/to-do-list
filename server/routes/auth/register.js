const router = require('express').Router()
const { signUpValidation } = require('../../validation/validation')
const { register } = require('../../controllers/register')

router.post('/users/register', signUpValidation, register)

module.exports = router

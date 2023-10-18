const router = require('express').Router()
const { getUser } = require('../../controllers/getUser')

router.get('/users/get', getUser)

module.exports = router

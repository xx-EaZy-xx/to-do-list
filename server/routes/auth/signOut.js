const router = require('express').Router()
const { signOut } = require('../../controllers/signOut')

router.post('/users/signout', signOut)

module.exports = router

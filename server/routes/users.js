const users = require('express').Router()
const { getUser } = require('../controllers/users')

// возвращает информацию о пользователе
users.get('/me', getUser)
// обновляет информацию о пользователе
module.exports = users

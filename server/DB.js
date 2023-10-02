const Sequelize = require('sequelize')
const DB = new Sequelize('postgres', 'postgres', 'user', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})
// Вынести константы БД в .env файл

module.exports = DB

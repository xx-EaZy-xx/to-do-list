const Sequelize = require('sequelize')
const { DB_DIALECT, DB_NAME, DB_PASSWORD } = require('./envconfig')
const DB = new Sequelize(DB_DIALECT, DB_NAME, DB_PASSWORD, {
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

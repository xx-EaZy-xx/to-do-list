const Sequelize = require('sequelize')
const {
  DB_DIALECT,
  DB_NAME,
  DB_PASSWORD,
  HOST,
  DB_DIALECT,
} = require('./envconfig')
const DB = new Sequelize(DB_DIALECT, DB_NAME, DB_PASSWORD, {
  host: HOST,
  dialect: DB_DIALECT,
  operatorsAliases: false,
})
// Вынести константы БД в .env файл

module.exports = DB

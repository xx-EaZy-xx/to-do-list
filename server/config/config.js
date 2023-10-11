const {
  DB_DIALECT,
  DB_NAME,
  DB_PASSWORD,
  HOST,
  DB_USERNAME,
} = require('../envconfig')

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: HOST,
    dialect: DB_DIALECT,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: HOST,
    dialect: DB_DIALECT,
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: HOST,
    dialect: DB_DIALECT,
  },
}

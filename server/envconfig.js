require('dotenv').config()

const { JWT_SECRET = 'dev-secret' } = process.env
const { PORT = '3000' } = process.env
const { NODE_ENV = 'development' } = process.env
const { DB_DIALECT = 'postgres' } = process.env
const { DB_NAME = 'postgres' } = process.env
const { DB_PASSWORD = 'user' } = process.env

module.exports = {
  JWT_SECRET,
  PORT,
  NODE_ENV,
  DB_DIALECT,
  DB_NAME,
  DB_PASSWORD,
}

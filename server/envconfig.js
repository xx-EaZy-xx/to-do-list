require('dotenv').config()

const { JWT_SECRET = 'dev-secret' } = process.env
const { PORT = '3000' } = process.env
const { NODE_ENV = 'development' } = process.env
const { DB_DIALECT = 'postgres' } = process.env
const { DB_NAME = 'postgres' } = process.env
const { DB_PASSWORD = 'user' } = process.env
const { HOST = 'localhost' } = process.env
const { DB_USERNAME = 'postgres' } = process.env
const { URI = '/' } = process.env

module.exports = {
  JWT_SECRET,
  PORT,
  NODE_ENV,
  DB_DIALECT,
  DB_NAME,
  DB_PASSWORD,
  HOST,
  DB_USERNAME,
  URI,
}

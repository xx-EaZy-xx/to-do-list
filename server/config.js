require('dotenv').config()

const { JWT_SECRET = 'dev-secret' } = process.env
const { PORT = '3000' } = process.env

module.exports = {
  JWT_SECRET,
  PORT,
}

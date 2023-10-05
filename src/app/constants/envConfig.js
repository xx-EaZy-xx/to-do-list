require('dotenv').config()

const { BASE_URL = 'http://localhost:3080' } = process.env

export { BASE_URL }

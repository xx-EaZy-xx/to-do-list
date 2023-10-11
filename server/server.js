const express = require('express')
require('dotenv').config()
const cors = require('cors')
const limiter = require('./middlewares/limiter')
const helmet = require('helmet')
const db = require('./models')
const recursive = require('recursive-readdir-sync')

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  })
  .catch((err) => {
    next(err)
  })

const { PORT, URI } = process.env

const app = express()

app.use(limiter)
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
//---Recursive route collector---
recursive(`${__dirname}/routes`).forEach((file) => {
  console.log('FILES!', file)
  app.use(URI, require(file))
})

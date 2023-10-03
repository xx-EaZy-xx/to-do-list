const express = require('express')
require('dotenv').config()
const cors = require('cors')
const index = require('./routes/index')
const limiter = require('./middlewares/limiter')
const helmet = require('helmet')
const db = require('./models')

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)``
  })

const { PORT } = process.env

const app = express()

app.get('/api', (req, res) => {
  res.send('Лови что-нибудь')
})

app.get('/api/else', (req, res) => {
  res.send('Лови else')
})

app.use(limiter)
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(index)

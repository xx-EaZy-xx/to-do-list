const express = require('express')
require('dotenv').config()
const cors = require('cors')
const index = require('./routes/index')
const limiter = require('./middlewares/limiter')
const helmet = require('helmet')
const DB = require('./DB.js')
const User = require('./models/user')

DB.sync()
  .then(() => {
    console.log('Synced db')
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })

// User.sync().then((res) => {
//   User.create({ name: 'Nathan' }).then((res) => {
//     console.log(`Insert successful: ${res.id}`)
//     console.log('connection closed')
//   })
// })

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

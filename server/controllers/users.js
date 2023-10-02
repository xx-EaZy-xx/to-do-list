const { NODE_ENV, JWT_SECRET } = process.env

const getUser = (req, res, next) => {
  res.send('get user')
}

module.exports = {
  getUser,
}

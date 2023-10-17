const signOut = async (req, res, next) => {
  try {
    await res.clearCookie('jwt')
    return res.send({ message: 'Токен удален из кукиса' })
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

module.exports = { signOut }

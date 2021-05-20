const jwt = require('jsonwebtoken')
const env = require('../config/env')

const auth = (req, res, next) => {
  const bearerToken = req.headers.authorization
  const token = bearerToken && bearerToken.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      message: 'Forbidden'
    })
  }

  jwt.verify(token, env.appKey, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Forbidden'
      })
    }

    req.user = user
    next()
  })
}

module.exports = auth

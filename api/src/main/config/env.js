require('dotenv').config()

module.exports = {
  port: process.env.PORT || 1337,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/wraith',
  appKey: process.env.APP_KEY || 'key'
}

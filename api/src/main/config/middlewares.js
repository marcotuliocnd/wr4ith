const { cors } = require('../middlewares')

module.exports = (app) => {
  app.use(cors)
}
